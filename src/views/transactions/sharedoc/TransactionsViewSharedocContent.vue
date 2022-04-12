<template>
  <v-row>
    <v-col cols="12" md="6">
      <TheTransactionsCommonContent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <component :is="componentName" :message="message" />
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
  inject: ['uuid'],
  computed: {
    ...mapGetters('transactions', ['detail']),
    componentName() {
      return !this.detail.version
        ? TransactionsViewSharedocMessage.name
        : MsgDefault.name;
    },
    message() {
      const msgIndex = this.tx.msgs.findIndex((msg) => {
        if (msg.uuid) {
          // Rename the 'uuid' key when a messge comes from the v2 chain, https://stackoverflow.com/a/50101979/11862643
          delete Object.assign(msg, { ['UUID']: msg['uuid'] })['uuid'];
        }
        return msg.UUID === this.uuid;
      });
      return msgIndex > -1 ? this.tx.msgs[msgIndex] : {};
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
  },
};
</script>
