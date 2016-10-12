import dotenv from 'dotenv';
import express from 'express';
import swig from 'swig';

import data from '../data/sharaal.json';

dotenv.config({ silent: true });

const app = express();
app.use(express.static('www'));
app.engine('twig', swig.renderFile);
app.get('/', (req, res) => {
  if (req.get('Accept') === 'application/json') {
    res.send(data);
  } else {
    res.render('index.html.twig', Object.assign({}, data));
  }
});
app.listen(process.env.PORT);
