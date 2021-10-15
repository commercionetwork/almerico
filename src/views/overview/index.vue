<template>
  <v-card outlined>
    <v-card-title>Work in progress</v-card-title>
  </v-card>
  <!-- <div>
    <v-row>
      <v-col cols="12">
        <OverviewHeader />
        <OverviewBody />
      </v-col>
    </v-row>
  </div> -->
</template>

<script>
import OverviewBody from './OverviewBody.vue';
import OverviewHeader from './OverviewHeader.vue';

import { mapActions } from 'vuex';

export default {
  name: 'overview',
  components: {
    OverviewHeader,
    OverviewBody,
  },
  methods: {
    ...mapActions('overview', {
      init: 'init',
    }),
  },
  created() {
    this.init();
  },
};
</script>
