require('dotenv-safe').config();

const path = require('path');

const express = require('express');
const app = express();
app.disable('x-powered-by');
app.engine('twig', require('swig').renderFile);
app.set('views', require('path').join(__dirname, '../views'));

require('@dnode/middlewares')(app, [
  express.static(path.join(__dirname, '../www'))]
);

const contentfulClient = require('@dnode/contentful')({
  accessToken: process.env.ACCESS_TOKEN,
  space: process.env.SPACE_ID,
});
const entryId = process.env.ENTRY_ID;

require('@dnode/controllers')(app, [
  require('./controller')({ contentfulClient, entryId }),
]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
