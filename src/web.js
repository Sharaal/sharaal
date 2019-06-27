require('@dnode/env');
require('@dnode/express')((app, express) => {
  const swig = require('@dnode/swig')({ app });

  const showdown = require('showdown');
  const converter = new showdown.Converter();
  function markdown(input) {
    return converter.makeHtml(input);
  }
  markdown.safe = true
  swig.setFilter('markdown', markdown);

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
