import http from 'http';
import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import { query } from './db';
dotenv.config()

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/phishme', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/phishme.html'));
});

app.post('/phishme', async (req, res) => {
  const body = req.body;
  await query("INSERT INTO Users (name) VALUES (?);", [body.name])
  await query("INSERT INTO Links (name, createdBy) VALUES (?, ?);", [body.name, body.url])
  res.send(`Here is your link: <code>localhost:6969/sus/${body.url}`);
});

app.get('/sus/:id', async (req, res) => {
  await query("INSERT INTO Clicks (userName, linkName) VALUES ('Aaron', ?);", [req.params.id])
  res.sendFile(path.join(__dirname + '/../public/youJustGotPhished.html'));
});

const httpServer = http.createServer(app);
httpServer.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.PORT}`));
