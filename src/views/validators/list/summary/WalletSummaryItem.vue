<template>
  <div class="text-center">
    <div class="text-overline font-weight-bold" v-text="label" />
    <span class="text-caption" v-text="formatBalance(amount)" />
  </div>
</template>

<script>
export default {
  name: 'WalletSummaryItem',
  props: ['label', `amount`],
  methods: {
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
