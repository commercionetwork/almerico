<template>
  <TopBodyCardComponent title="com">
    <template v-slot:content>
      <span v-if="isLoading" data-test="loading">
        <v-progress-circular
          color="primary"
          indeterminate
          size="50"
          widht="10"
        />
      </span>
      <span v-else-if="error" data-test="error">
        <v-alert border="left" prominent text type="error">
          <span class="text-body-1" v-text="errorMessage" />
        </v-alert>
      </span>
      <span
        v-else
        class="text-h4 primary--text font-weight-bold"
        v-text="tokenValue"
        data-test="content"
      />
    </template>
  </TopBodyCardComponent>
</template>

<script>
import TopBodyCardComponent from '@/components/TopBodyCardComponent.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'DashboardPrice',
  components: { TopBodyCardComponent },
  computed: {
    ...mapGetters('dashboard', {
      conversionRate: 'conversionRate',
      error: 'error',
      isLoading: 'isLoading',
    }),
    errorMessage() {
      return this.error && this.error.data
        ? this.error.data.error
        : JSON.stringify(this.error);
    },
    tokenValue() {
      const rate = parseFloat(this.conversionRate);
      return !isNaN(rate) && rate > 0 ? `€ ${(1 / rate).toFixed(2)}` : '-';
    },
  },
};
</script>
