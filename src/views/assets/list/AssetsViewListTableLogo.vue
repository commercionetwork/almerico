<template>
  <v-avatar>
    <v-img v-if="logoSrc" :src="logoSrc" max-height="30" max-width="30">
      <template v-slot:placeholder>
        <v-progress-circular :width="2" indeterminate color="grey lighten-1" />
      </template>
    </v-img>
    <v-icon v-else color="grey lighten-1" size="30">
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
      if (this.logo && this.logo.url) {
        return this.logo?.url;
      }
      if (this.logo && this.logo.embedded && this.logo.embedded.png) {
        return this.logo.embedded.png;
      }
      if (this.logo && this.logo.embedded && this.logo.embedded.svg) {
        return this.logo.embedded.svg;
      }
      return null;
    },
  },
};
</script>
