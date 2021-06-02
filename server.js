const express = require('express');
const mongoose = require('mongoose');
const generateshortUrL = require('./utils');
const DB_URL = 'mongodb://127.0.0.1:4444/shortlinks';

const app = express();
const PORT = 3000;

app.get('/shorturl', (req, res) => {
  console.log(req.query.url);
  let shortURL = generateshortUrL();
  res.send(`https://test.com/${shortURL}`);
});

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(error => console.log("Error: ", error));


///shorturl?url=https://google.com