const path = require("path");
const jsonImporter = require('node-sass-json-importer');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("Assets", resolve("./src/assets/"))
      .set("Components", resolve("./src/components/"))
      .set("Constants", resolve("./src/constants/"))
      .set("Setup", resolve("./src/setup/"))
      .set("Store", resolve("./src/store/"))
      .set("Utils", resolve("./src/utils/"))
      .set("Views", resolve("./src/views/"));
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => {
        options.compilerOptions.modules = [{
          preTransformNode(astEl) {
            if (process.env.NODE_ENV === 'production') {
              const {
                attrsMap,
                attrsList
              } = astEl;
              if (attrsMap['data-test']) {
                delete attrsMap['data-test'];
                const index = attrsList.findIndex(x => x.name === 'data-test');
                attrsList.splice(index, 1);
              }
            }
            return astEl;
          }
        }];
        return options;
      });
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          importer: jsonImporter()
        },
        prependData: `
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_z-index.scss";
          @import "@/assets/scss/custom-bootstrap.scss";
        `
      }
    }
  }
};
