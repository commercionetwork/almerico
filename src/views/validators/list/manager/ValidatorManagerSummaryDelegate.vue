<template>
  <v-card flat outlined>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <div
            class="text-center text-caption font-weight-bold"
            v-text="$t('labels.delegated')"
          />
          <div class="text-center text-body-2" v-text="delegated" />
        </v-col>
        <v-col cols="6">
          <div
            class="text-center text-caption font-weight-bold"
            v-text="$t('labels.availables')"
          />
          <div class="text-center text-body-2" v-text="availables" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ValidatorManagerSummaryDelegate',
  props: ['summary'],
  computed: {
    delegated() {
      return this.formatTokens(this.summary.delegated) + ' COM';
    },
    availables() {
      return this.formatTokens(this.summary.availables) + ' COM';
    },
  },
  methods: {
    formatTokens(amount) {
      return new Intl.NumberFormat(undefined, {
        style: 'decimal',
        maximumFractionDigits: 6,
        minimumFractionDigits: 6,
      }).format(amount / 1000000);
    },
  },
};
</script>
