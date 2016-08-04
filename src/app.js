'use strict';

const express = require('express');
const app = express();
app.use(express.static('www'));
app.engine('twig', require('swig').renderFile);
const data = require('../data/sharaal.json');
app.get('/', (req, res) => {
  res.render('index.html.twig', data);
});
app.listen(process.env.PORT);
