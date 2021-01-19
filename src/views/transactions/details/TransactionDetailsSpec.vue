<template>
  <v-card elevation="2">
    <v-card-title class="subtitle-2" v-text="hash" />
    <v-card-subtitle v-text="'Hash'" />
    <v-divider />
    <v-card-text>
      <div v-text="'Time'" />
      <div class="pb-1 font-weight-bold" v-text="time" />
      <div v-text="'Status'" />
      <div
        class="pb-1 font-weight-bold"
        :class="transaction.code ? 'error--text' : 'info--text'"
        v-text="status"
      />
      <div v-text="'Fee'" />
      <div class="pb-1 font-weight-bold" v-text="fee" />
      <div v-text="'Gas (used/wanted)'" />
      <div class="pb-1 font-weight-bold" v-text="gas" />
      <div v-text="'Height'" />
      <router-link
        v-if="version === ''"
        class="text-decoration-none font-weight-bold"
        v-text="blockHeight"
        :to="blockLink"
      />
      <span v-else v-text="blockHeight" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';

export default {
  name: 'TransactionDetailsSpec',
  computed: {
    ...mapGetters('transactions', {
      transaction: 'details',
      version: 'version',
    }),
    blockHeight() {
      return this.transaction ? this.transaction.height : '';
    },
    blockLink() {
      return this.transaction
        ? {
            name: ROUTES.NAMES.BLOCKS_DETAILS,
            params: { id: this.blockHeight },
          }
        : {};
    },
    fee() {
      return this.transaction
        ? this.getFee(this.transaction.tx.value.fee.amount)
        : '';
    },
    gas() {
      return this.transaction
        ? `${this.transaction.gas_used}/${this.transaction.gas_wanted}`
        : '';
    },
    hash() {
      return this.transaction ? this.transaction.txhash : '';
    },
    status() {
      return this.transaction.code ? 'Failed' : 'Success';
    },
    time() {
      return this.transaction
        ? new Date(this.transaction.timestamp).toLocaleString()
        : '';
    },
  },
  methods: {
    /**
     * @param {Array.<Object>} amount
     * @returns {String}
     */
    getFee(amounts) {
      const total =
        amounts.reduce((acc, amount) => acc + parseFloat(amount.amount), 0) /
        1000000;
      return total !== 0
        ? new Intl.NumberFormat(undefined, {
            minimumFractionDigits: 6,
            maximumFractionDigits: 6,
          }).format(total) +
            ' ' +
            'Commercio'
        : '0';
    },
  },
};
</script>
