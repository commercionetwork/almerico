<template>
  <v-row class="py-2">
    <v-col cols="3" class="text-center">
      <a href="https://discord.gg/xgzQbSHHaB" target="_blank">
        <v-icon color="primary" size="20">$vuetify.icons.discord </v-icon>
      </a>
    </v-col>
    <v-col cols="3" class="text-center">
      <a href="https://github.com/commercionetwork" target="_blank">
        <v-icon color="primary" size="20">{{ mdiGithub }}</v-icon>
      </a>
    </v-col>
    <v-col cols="3" class="text-center">
      <a href="https://t.me/CommercioNetwork" target="_blank">
        <v-icon color="primary" size="20">$vuetify.icons.telegram </v-icon>
      </a>
    </v-col>
    <v-col cols="3" class="text-center">
      <a href="https://x.com/commercionet" target="_blank">
        <v-icon color="primary" size="20">$vuetify.icons.x</v-icon>
      </a>
    </v-col>
  </v-row>
</template>

<script>
import { mdiGithub } from '@mdi/js';

export default {
  name: 'TheDrawerMedialSocials',
  data() {
    return {
      mdiGithub,
    };
  },
};
</script>
