module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_MAIN_TITLE || 'Commercio Net';
      return args;
    });
    config.plugin('define').tap((args) => {
      const version = JSON.stringify(require('./package.json').version);
      args[0]['process.env']['APP_VERSION'] = version || 'x.y.z';
      return args;
    });
  },
};
