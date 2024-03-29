<template>
  <v-avatar>
    <v-img v-if="logoSrc" :src="logoSrc" max-height="30" max-width="30">
      <template v-slot:placeholder>
        <v-progress-circular :width="2" indeterminate color="primary" />
      </template>
    </v-img>
    <v-icon v-else color="grey lighten-1" size="25">
      {{ mdiImageOff }}
    </v-icon>
  </v-avatar>
</template>

<script>
import { mdiImageOff } from '@mdi/js';

export default {
  name: 'AssetsViewListTableLogo',
  props: {
    asset: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      mdiImageOff,
    };
  },
  computed: {
    logo() {
      return this.asset.logo;
    },
    logoSrc() {
      if (!this.logo) {
        return '';
      }
      let src = '';
      if (this.logo.url) {
        src = this.logo.url;
      }
      if (this.logo.embedded && this.logo.embedded.png) {
        src = this.logo.embedded.png;
      }
      if (this.logo.embedded && this.logo.embedded.svg) {
        src = this.logo.embedded.svg;
      }
      return src;
    },
  },
};
</script>
