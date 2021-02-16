module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title =
        process.env.VUE_APP_MAIN_TITLE !== undefined
          ? process.env.VUE_APP_MAIN_TITLE
          : 'Commercio Net';
      return args;
    });
  },
};
