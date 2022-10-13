<template>
  <v-form :disabled="isLoading" @submit.prevent="onConfirm">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <ValidatorManagerAction v-model="model.action" />
      </v-col>
      <v-col v-if="isRedelegating" cols="12" md="8" offset-md="2">
        <ValidatorManagerDelegationSearch
          :delegations="delegations"
          :validatorAddress="validatorAddress"
          v-model="model.srcAddress"
        />
      </v-col>
      <v-col cols="12" md="8" offset-md="2">
        <ValidatorManagerAmount
          v-model.number="model.amount"
          :v="$v.model.amount"
        />
      </v-col>
      <v-col cols="12" md="4" offset-md="4">
        <v-btn
          :loading="isLoading"
          block
          color="primary"
          depressed
          type="submit"
        >
          <span v-text="$t('labels.confirm')" />
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import ValidatorManagerAmount from './ValidatorManagerAmount.vue';
import ValidatorManagerAction from './ValidatorManagerAction.vue';
import ValidatorManagerDelegationSearch from './ValidatorManagerDelegationSearch.vue';

import { decimal, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { VALIDATORS } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorManagerForm',
  components: {
    ValidatorManagerAmount,
    ValidatorManagerAction,
    ValidatorManagerDelegationSearch,
  },
  mixins: [validationMixin],
  validations: {
    model: {
      amount: {
        decimal,
        required,
      },
    },
  },
  props: ['delegations', 'validatorAddress'],
  data() {
    return {
      model: {
        action: VALIDATORS.STAKING_ACTIONS[0],
        amount: 0,
        srcAddress: null,
      },
    };
  },
  computed: {
    ...mapGetters('validators', ['isLoading']),
    isRedelegating() {
      return this.model.action.id === 2;
    },
    stakingAction() {
      const actionId = this.model.action.id;
      switch (actionId) {
        case 2:
          return this.redelagateTokens;
        case 3:
          return this.undelegateTokens;
        default:
          return this.delegateTokens;
      }
    },
  },
  methods: {
    ...mapActions('validators', [
      'delegateTokens',
      'undelegateTokens',
      'redelagateTokens',
    ]),
    onConfirm() {
      this.stakingAction({
        validatorAddress: this.validatorAddress,
        srcAddress: this.model.srcAddress?.address || '',
        amount: (this.model.amount * 1000000).toString(),
        translator: this.$t,
        context: this,
      });
    },
  },
};
</script>
