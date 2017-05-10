require('dotenv-safe').config();

const app = require('dexpress')();
app.use(require('express').static('www'));
app.engine('twig', require('swig').renderFile);
const client = require('dcontentful').createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});
app.get('/', async (req, res) => {
  const data = await client.getEntry(process.env.ENTRY_ID);
  if (req.get('Accept') === 'application/json') {
    res.send(data);
  } else {
    res.render('index.html.twig', data);
  }
});
