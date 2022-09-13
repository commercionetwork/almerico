import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';
import IconDiscord from '@/components/icons/IconDiscord.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
    values: {
      discord: {
        component: IconDiscord,
        props: {
          height: 512,
          width: 640,
        },
      },
      telegram: {
        component: IconTelegram,
        props: {
          height: 512,
          width: 496,
        },
      },
    },
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
