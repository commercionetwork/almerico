<template>
  <div class="d-flex flex-column justify-center align-end align-content-center">
    <div v-if="detailLogo">
      <v-img class="pa-1" :src="detailLogo" max-height="40" max-width="40">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </div>
    <div v-else>
      <v-icon size="40" :color="isActive ? 'info' : 'warning'">
        {{ mdiHubspot }}
      </v-icon>
    </div>
    <div class="text-caption" :class="statusClass" v-text="statusText" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiHubspot } from '@mdi/js';

export default {
  name: 'ValidatorsViewDetailContentTopLeftLogo',
  data() {
    return {
      mdiHubspot,
    };
  },
  computed: {
    ...mapGetters('validators', ['detail', 'detailLogo']),
    isActive() {
      return this.detail ? this.detail.status === 3 : false;
    },
    statusClass() {
      return this.isActive ? 'info--text' : 'warning--text';
    },
    statusText() {
      return this.isActive
        ? this.$t('labels.active')
        : this.$t('labels.inactive');
    },
  },
};
</script>
