// api/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Vercel Server Working');
});

module.exports = app;
