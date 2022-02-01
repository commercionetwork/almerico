<template>
  <v-row>
    <v-col cols="12" md="6">
      <TransactionsCommonContentComponent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <div v-for="(message, i) in tx.msgs" :key="i">
        <TransactionsDetailSpecificContentComponent :message="message" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import TransactionsCommonContentComponent from '../common/TransactionsCommonContentComponent.vue';
import TransactionsDetailSpecificContentComponent from './TransactionsDetailSpecificContentComponent.vue';

import transactionsDetailHelper from '../common/helpers/transactionsDetailHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsDetailContentComponent',
  components: {
    TransactionsCommonContentComponent,
    TransactionsDetailSpecificContentComponent,
  },
  computed: {
    ...mapGetters('transactions', {
      detail: 'detail',
    }),
    tx() {
      return transactionsDetailHelper.build({
        detail: this.detail,
        labels: {
          success: this.$t('labels.success'),
          failed: this.$t('labels.failed'),
          multiTypes: this.$t('labels.multiTypes'),
        },
      });
    },
  },
};
</script>
