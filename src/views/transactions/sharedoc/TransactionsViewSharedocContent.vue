<template>
  <v-row>
    <v-col cols="12" md="6">
      <TheTransactionsCommonContent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <component v-bind:is="componentName" :message="message" />
    </v-col>
  </v-row>
</template>

<script>
import MsgDefault from '../common/MsgDefault.vue';
import TheTransactionsCommonContent from '../common/TheTransactionsCommonContent.vue';
import TransactionsViewSharedocMessage from './TransactionsViewSharedocMessage.vue';

import transactionsDetailHelper from '../common/helpers/transactionsDetailHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionsViewSharedocContent',
  components: {
    MsgDefault,
    TheTransactionsCommonContent,
    TransactionsViewSharedocMessage,
  },
  computed: {
    ...mapGetters('transactions', {
      detail: 'detail',
    }),
    componentName() {
      return !this.detail.version
        ? TransactionsViewSharedocMessage.name
        : MsgDefault.name;
    },
    message() {
      const msgIndex = this.tx.msgs.findIndex((msg) => {
        if (msg.UUID)
          delete Object.assign(msg, { ['uuid']: msg['UUID'] })['UUID'];
        return msg.uuid === this.uuid;
      });
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
