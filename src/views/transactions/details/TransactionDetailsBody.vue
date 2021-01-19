<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="5">
        <TransactionDetailsSpec
          :hash="tx.hash"
          :time="tx.time"
          :status="tx.status"
          :fee="tx.fee"
          :gas="tx.gas"
          :height="tx.height"
          :ledger="tx.ledger"
          :version="tx.version"
        />
      </v-col>
      <v-col cols="12" md="7">
        <TransactionDetailsMsg :txType="tx.type" :msgs="tx.msgs" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import TransactionDetailsSpec from './TransactionDetailsSpec';
import TransactionDetailsMsg from './TransactionDetailsMsg';

export default {
  name: 'TransactionDetailsBody',
  components: {
    TransactionDetailsSpec,
    TransactionDetailsMsg,
  },
  props: {
    tx: {
      type: Object,
      required: true,
      note: 'The tx details to display',
    },
  },
};
</script>
