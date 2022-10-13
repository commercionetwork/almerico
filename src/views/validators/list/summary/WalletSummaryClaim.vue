<template>
  <v-row class="py-2">
    <v-col cols="12" md="6" class="d-flex justify-space-around align-center">
      <v-icon color="primary" size="30">
        {{ mdiGift }}
      </v-icon>
      <span class="text-caption" v-text="formatBalance(amount)" />
    </v-col>
    <v-col cols="12" md="6" class="d-flex justify-end">
      <v-btn color="primary" depressed :disabled="!hasRewards" @click="claim">
        <span v-text="$t('labels.claimRewards')" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mdiGift } from '@mdi/js';

export default {
  name: 'WalletSummaryClaim',
  props: {
    amount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      mdiGift,
    };
  },
  computed: {
    ...mapGetters('validators', ['wallet']),
    hasRewards() {
      return this.amount > 0;
    },
    validators() {
      return this.wallet.delegations.map(
        (el) => el.delegation.validator_address
      );
    },
  },
  methods: {
    ...mapActions('validators', ['claimRewards']),
    claim() {
      this.claimRewards({
        validators: this.validators,
        translator: this.$t,
        context: this,
      });
    },
    formatBalance(amount, decimals = 6) {
      const balance = amount / Math.pow(10, decimals);
      return (
        new Intl.NumberFormat(undefined, {
          style: 'decimal',
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        }).format(balance) + ' COM'
      );
    },
  },
};
</script>
