<template>
  <v-card outlined>
    <v-card-title class="justify-center text-h4">
      <span class="primary--text font-weight-bold" v-text="tokenValue" />
    </v-card-title>
    <v-card-subtitle
      class="text-center text-capitalize text-subtitle-2"
      v-text="'token value'"
    />
    <v-card-text class="text-center">
      <span class="d-block">
        Validators:
        <span class="font-weight-bold">
          {{ validatorsTotal }} (bonded {{ validatorsBondeds }})
        </span>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DashboardStats",
  computed: {
    ...mapGetters("starting", {
      conversionRate: "conversionRate"
    }),
    ...mapGetters("validators", {
      validators: "validators"
    }),
    tokenValue() {
      const rate = parseFloat(this.conversionRate);
      return !isNaN(rate) && rate > 0 ? `€ ${(1 / rate).toFixed(2)}` : "-";
    },
    validatorsBondeds() {
      return this.validators.filter(validator => validator.status === 2).length;
    },
    validatorsTotal() {
      return this.validators.length;
    }
  }
};
</script>
