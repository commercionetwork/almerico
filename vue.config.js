const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
    resolve: {
      alias: {
        // axios >=1.8 ships raw ESM under its "browser" → "default" export
        // condition, which breaks the webpack 5 build used by Vue CLI 5
        // (`__WEBPACK_DEFAULT_EXPORT__ is not defined` on parseHeaders.js).
        // Force-resolve to the CJS browser bundle that axios itself ships.
        axios: path.resolve(
          __dirname,
          'node_modules/axios/dist/browser/axios.cjs',
        ),
      },
      fallback: {
        buffer: false,
        crypto: false,
        events: false,
        path: false,
        stream: false,
        string_decoder: false,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      const version = JSON.stringify(require('./package.json').version);
      args[0]['process.env']['APP_VERSION'] = version || 'x.y.z';
      return args;
    });
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_MAIN_TITLE || 'Commercio Net';
      return args;
    });
  },
});
