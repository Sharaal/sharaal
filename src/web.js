require('@dnode/env');
require('@dnode/express')((app, express) => {
  require('@dnode/swig')({ app });

  require('@dnode/middlewares')(app, [
    express.static(require('path').join(process.cwd(), 'www')),
  ]);

  const contentful = require('@dnode/contentful')({
    accessToken: process.env.ACCESS_TOKEN,
    space: process.env.SPACE_ID,
  });

  require('@dnode/controllers')(app, [
    require('./controller')({ contentful, entryId: process.env.ENTRY_ID }),
  ]);
});
