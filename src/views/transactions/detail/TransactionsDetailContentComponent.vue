<template>
  <v-row>
    <v-col cols="12" md="6">
      <TransactionsDetailCommonContentComponent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <TransactionsDetailMessageComponent
        v-for="(msg, i) in tx.msgs"
        :key="i"
        :message="msg"
      />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsDetailCommonContentComponent from './TransactionsDetailCommonContentComponent.vue';
import TransactionsDetailMessageComponent from './TransactionsDetailMessageComponent.vue';

import transactionsDetailHelper from './helpers/transactionsDetailHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsDetailContentComponent',
  components: {
    TransactionsDetailCommonContentComponent,
    TransactionsDetailMessageComponent,
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
