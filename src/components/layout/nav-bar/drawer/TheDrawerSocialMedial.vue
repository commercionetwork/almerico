<template>
  <v-list-item class="mt-auto">
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
        <a
          href="https://twitter.com/commercionet?s=21&t=8FTpg5f7kurZ1d7LOb9YXw"
          target="_blank"
        >
          <v-icon color="primary" size="20">{{ mdiTwitter }}</v-icon>
        </a>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script>
import { mdiGithub, mdiTwitter } from '@mdi/js';

export default {
  name: 'TheDrawerSocialMedial',
  data() {
    return {
      mdiGithub,
      mdiTwitter,
    };
  },
};
</script>
