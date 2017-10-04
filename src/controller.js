module.exports = ({ contentful, entryId }) => [
  'get',
  [
    '/',
    async (req, res) => {
      res.render('index.html.twig', { user: await contentful.getEntry(entryId) });
    },
  ],
];
