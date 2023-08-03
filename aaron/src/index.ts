import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';

import { query } from './db';

dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.get('/api/leaderboard', async (_, res) => {
  const data =
    await query(
      "SELECT Links.createdBy as user, count(Clicks.userName) numClicks FROM Clicks INNER JOIN Links ON Links.name = Clicks.linkName GROUP BY Links.createdBy ORDER BY count(Clicks.userName) DESC;", [])
      .catch(() => { })
  res.json(data);
})

app.post('/generate_url', async (req, res) => {
  const body = req.body;
  body.url = encodeURIComponent(body.url)
  await query("INSERT INTO Users (name) VALUES (?);", [body.name]).catch((_) => { })
  await query("INSERT INTO Links (name, createdBy) VALUES (?, ?);", [body.url, body.name]).catch((_) => {
    res.status(400).send("Link already exists")
  })
  if (res.headersSent) return;
  res.json({ url: `aaron.lieber.men/sus/${body.url}` });
});

app.get('/sus/:id', async (req, res) => {
  if (req.cookies.pass && req.cookies.pass === process.env.PHISHING_PASSWORD) {
    await query("INSERT INTO Clicks (userName, linkName) VALUES ('Aaron', ?);", [req.params.id])
  }
  res.sendFile(path.join(__dirname + '/../public/youJustGotPhished.html'));
});

app.use(express.static('public', { extensions: ['html'] }));

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
