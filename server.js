require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes/allRoutes')
const path = require('path');

// set up express
// test
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use(express.static(path.join(__dirname, "client", "build" )));

const PORT = process.env.PORT || 4000;
db.on('error', console.error.bind(console, 'connection error:'));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`The server has started on port: ${PORT}`);
  });
});
