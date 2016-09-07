'use strict';

const express = require('express');
const app = express();
app.use(express.static('www'));
app.engine('twig', require('swig').renderFile);
const data = require('../data/sharaal.json');
app.get('/', (req, res) => {
  if (req.get('Accept') === 'application/json') {
    res.send(data);
  } else {
    res.render('index.html.twig', Object.assign({}, data));
  }
});
app.listen(process.env.PORT);
