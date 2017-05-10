require('dotenv-safe').config();

const app = require('dexpress')();
app.use(require('express').static('www'));
app.engine('twig', require('swig').renderFile);
const client = require('dcontentful').createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});
const dcache = require('dcache')(require('dcache-memory')());
app.get('/', async (req, res) => {
  dcache(
    'data',
    async (callback) => {
      const data = await client.getEntry(process.env.ENTRY_ID);
      callback(data);
    },
    (data) => {
      if (req.get('Accept') === 'application/json') {
        res.send(data);
      } else {
        res.render('index.html.twig', data);
      }
    },
    process.env.EXPIRE || require('dparse-duration')('1h', 's')
  );
});
