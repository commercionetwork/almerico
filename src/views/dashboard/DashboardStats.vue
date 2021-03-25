<template>
  <v-card outlined>
    <v-card-text>
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
import { mapGetters } from 'vuex';
export default {
  name: 'DashboardStats',
  computed: {
    ...mapGetters('validators', {
      validators: 'validators',
    }),
    validatorsBondeds() {
      return this.validators.filter((validator) => validator.status === 2)
        .length;
    },
    validatorsTotal() {
      return this.validators.length;
    },
  },
};
</script>
