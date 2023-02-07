import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import * as dotenv from 'dotenv';
import { query } from './db';
dotenv.config()

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/phishing.html'));
});

app.get('/leaderboard', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/leaderboard.html'));
});

app.post('/generate_url', async (req, res) => {
  const body = req.body;
  await query("INSERT INTO Users (name) VALUES (?);", [body.name])
  await query("INSERT INTO Links (name, createdBy) VALUES (?, ?);", [body.name, body.url])
  res.send(`Here is your link: <code>aaron.lieber.men/sus/${body.url}`);
});

app.get('/sus/:id', async (req, res) => {
  if (req.cookies.pass === process.env.PHISHING_PASSWORD) {
    await query("INSERT INTO Clicks (userName, linkName) VALUES ('Aaron', ?);", [req.params.id])
  }
  const user = await query("Select name FROM Links WHERE url = ?;", [req.params.id])
  console.log(user)
  res.sendFile(path.join(__dirname + '/../public/youJustGotPhished.html'));
});

app.use(express.static('public'))

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
