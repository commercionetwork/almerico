<template>
  <base-top-content-card :title="$t('titles.latestHeight')">
    <template #content>
      <div
        class="primary--text text-h4 font-weight-bold fill-height d-flex justify-center"
        v-text="latestHeight"
      />
    </template>
  </base-top-content-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BlocksViewDetailCountdownCurrent',
  computed: {
    ...mapGetters('application', ['latestBlock']),
    latestHeight() {
      return parseInt(this.latestBlock.header.height);
    },
  },
};
</script>
