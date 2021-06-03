const express = require('express');
const mongoose = require('mongoose');
const generateshortUrL = require('./utils');
const DB_URL = 'mongodb://127.0.0.1:4444/shortlinks';
const Link = require('./models/links');

const app = express();
const PORT = 3000;

app.get('/shorturl', async (req, res) => {
  try{
    const existing = await Link.find({url: req.query.url})
    if(existing.length > 0) res.send(existing);
    else {
      let shortUrl = generateshortUrL();
      const link = new Link({
        url: req.query.url,
        shortUrl
      });
      const result = await link.save();
      res.send(result);
    }
  }catch(error){
    console.log("Error: ", error)
  }
});

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connected to DB");
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch(error => console.log("Error: ", error));


///shorturl?url=https://google.com