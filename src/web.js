require('dotenv-safe').config();

const express = require('express');
const app = express();
app.disable('x-powered-by');
app.engine('twig', require('swig').renderFile);

require('@dnode/middlewares')(app, [express.static('www')]);

const contentful = require('dcontentful').createClient({
  accessToken: process.env.ACCESS_TOKEN,
  space: process.env.SPACE_ID,
});
const entryId = process.env.ENTRY_ID;

require('@dnode/controllers')(app, [
  require('./controller')({ contentful, entryId }),
]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
