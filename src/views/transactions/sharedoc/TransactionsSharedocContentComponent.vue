<template>
  <v-row>
    <v-col cols="12" md="6">
      <TransactionsCommonContentComponent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <TransactionsSharedocSpecificContentComponent :message="message" />
    </v-col>
  </v-row>
</template>

<script>
import TransactionsCommonContentComponent from '../common/TransactionsCommonContentComponent.vue';
import TransactionsSharedocSpecificContentComponent from './TransactionsSharedocSpecificContentComponent.vue';

import transactionsDetailHelper from '../common/helpers/transactionsDetailHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsSharedocContentComponent',
  components: {
    TransactionsCommonContentComponent,
    TransactionsSharedocSpecificContentComponent,
  },
  computed: {
    ...mapGetters('transactions', {
      detail: 'detail',
    }),
    message() {
      const msgIndex = this.tx.msgs.findIndex((msg) => msg.UUID === this.uuid);
      return msgIndex > -1 ? this.tx.msgs[msgIndex] : null;
    },
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
    uuid() {
      return this.$route.params.uuid;
    },
  },
};
</script>
