<template>
  <v-card elevation="2">
    <v-card-title v-text="txType" />
    <v-card-subtitle v-text="'Msg type'" />
    <v-list>
      <v-list-item v-for="(msg, index) in msgs" :key="index">
        <v-list-item-content class="text-body-2 text-break" v-text="msg" />
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDetailsMsg',
  props: {
    msgs: {
      type: Array,
      note: 'Messages list to display',
    },
    txType: {
      type: String,
      note: 'The message type',
    },
  },
  computed: {
    ...mapGetters('transactions', {
      transaction: 'details',
    }),
  },
};
</script>
