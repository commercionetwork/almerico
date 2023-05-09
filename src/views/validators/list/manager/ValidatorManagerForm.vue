<template>
  <v-form :disabled="isLoading" @submit.prevent="onConfirm">
    <v-row>
      <v-col cols="12" md="8" offset-md="2">
        <validator-manager-action v-model="model.action" />
      </v-col>
      <v-col v-if="isRedelegating" cols="12" md="8" offset-md="2">
        <validator-manager-delegation-search
          :delegations="delegations"
          :validatorAddress="validatorAddress"
          v-model="model.srcAddress"
        />
      </v-col>
      <v-col cols="12" md="8" offset-md="2">
        <validator-manager-summary :actionId="actionId" :summary="summary" />
      </v-col>
      <v-col cols="12" md="8" offset-md="2">
        <validator-manager-max-button v-on:set-max="onSetMax" />
        <validator-manager-amount
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
      <v-col v-if="!isRedelegating" cols="12" md="8" offset-md="2">
        <validator-manager-advice :actionId="actionId" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import ValidatorManagerAction from './ValidatorManagerAction.vue';
import ValidatorManagerAdvice from './ValidatorManagerAdvice.vue';
import ValidatorManagerAmount from './ValidatorManagerAmount.vue';
import ValidatorManagerDelegationSearch from './ValidatorManagerDelegationSearch.vue';
import ValidatorManagerMaxButton from './ValidatorManagerMaxButton.vue';
import ValidatorManagerSummary from './ValidatorManagerSummary.vue';

import { validationMixin } from 'vuelidate';
import { decimal, required } from 'vuelidate/lib/validators';

import walletBalanceHelper from '../helpers/walletBalanceHelper';
import { VALIDATORS } from '@/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ValidatorManagerForm',
  components: {
    ValidatorManagerAction,
    ValidatorManagerAdvice,
    ValidatorManagerAmount,
    ValidatorManagerDelegationSearch,
    ValidatorManagerMaxButton,
    ValidatorManagerSummary,
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
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('validators', ['isLoading', 'wallet']),
    actionId() {
      return this.model.action.id;
    },
    isRedelegating() {
      return this.actionId === 2;
    },
    stakingAction() {
      switch (this.actionId) {
        case 2:
          return this.redelagateTokens;
        case 3:
          return this.undelegateTokens;
        default:
          return this.delegateTokens;
      }
    },
    summary() {
      return walletBalanceHelper.filterToManage({
        wallet: this.wallet,
        validatorAddress: this.validatorAddress,
        srcAddress: this.model.srcAddress?.address || '',
        bondDenom: this.stakingParams.bond_denom,
      });
    },
  },
  watch: {
    actionId() {
      this.resetAmount();
    },
  },
  created() {
    this.resetAmount();
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
    onSetMax() {
      let amount = 0;
      switch (this.actionId) {
        case 2:
          amount = this.summary.redelegable;
          break;
        case 3:
          amount = this.summary.delegated;
          break;
        default:
          amount = this.summary.availables;
          break;
      }
      this.model.amount = amount / 1000000;
    },
    resetAmount() {
      this.model.amount = 0;
    },
  },
};
</script>
