module.exports = ({ contentfulClient, entryId }) => [
  'get',
  [
    '/',
    async (req, res) => {
      const user = await contentfulClient.getEntry(entryId);
      if (req.get('Accept') === 'application/json') {
        res.send(user);
      } else {
        res.render('index.html.twig', { user });
      }
    },
  ],
];
