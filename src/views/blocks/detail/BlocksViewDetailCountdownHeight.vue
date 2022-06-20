<template>
  <BaseTopContentCard :title="$t('titles.remainingBlocks')">
    <template #content>
      <div
        class="primary--text text-h4 font-weight-bold fill-height d-flex justify-center"
        v-text="remainingBlocks"
      />
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard';

import { mapGetters } from 'vuex';

export default {
  name: 'BlocksViewDetailCountdownHeight',
  components: { BaseTopContentCard },
  computed: {
    ...mapGetters('application', ['latestBlock']),
    height() {
      return this.$route.params.id;
    },
    remainingBlocks() {
      const latestHeight = parseInt(this.latestBlock.header.height);
      return this.height - latestHeight;
    },
  },
};
</script>
