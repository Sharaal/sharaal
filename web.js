module.exports = {
  controllers: [
    ['./src/controller', { entryId: process.env.ENTRY_ID }],
  ],
  services: {
    contentful: ['@dnode/contentful', {
      accessToken: process.env.ACCESS_TOKEN,
      space: process.env.SPACE_ID,
    }],
    swig: '@dnode/swig',
  },
};
