import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#38ba8c',
        background: colors.grey.lighten5,
        backgroundFooter: colors.blueGrey.lighten5,
      },
      dark: {
        primary: '#38ba8c',
        secondary: colors.grey.lighten4,
      },
    },
  },
});
