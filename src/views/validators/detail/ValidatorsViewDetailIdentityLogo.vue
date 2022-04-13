<template>
  <v-avatar>
    <v-img
      v-if="detailLogo"
      class="pa-1"
      :src="detailLogo"
      max-height="40"
      max-width="40"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    <v-icon v-else color="grey lighten-1" size="40">
      {{ mdiCog }}
    </v-icon>
  </v-avatar>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiCog } from '@mdi/js';

export default {
  name: 'ValidatorsViewDetailIdentityLogo',
  data() {
    return {
      mdiCog,
    };
  },
  computed: {
    ...mapGetters('validators', ['detailLogo']),
  },
};
</script>
