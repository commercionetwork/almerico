<template>
  <BaseTopContentCard :title="$t('titles.latestHeight')">
    <template #content>
      <div
        class="primary--text text-h4 font-weight-bold fill-height d-flex justify-center"
        v-text="latestHeight"
      />
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard';

import { mapGetters } from 'vuex';

export default {
  name: 'BlocksViewDetailCountdownCurrent',
  components: { BaseTopContentCard },
  inject: ['height'],
  computed: {
    ...mapGetters('application', ['latestBlock']),
    latestHeight() {
      return parseInt(this.latestBlock.header.height);
    },
  },
};
</script>
