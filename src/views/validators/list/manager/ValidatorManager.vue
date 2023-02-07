<template>
  <div>
    <v-btn
      :disabled="!isInitialized"
      :loading="isLoadingWallet"
      @click="dialog = true"
      color="primary"
      depressed
    >
      <span class="text-caption" v-text="$t('labels.manage')" />
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            <span
              class="text-h5 primary--text font-weight-bold"
              v-text="moniker"
            />
            <div class="text-body-2" v-text="commissionComplete" />
          </v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon color="grey" dark @click="dialog = false">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <ValidatorManagerForm
            :delegations="delegations"
            :validatorAddress="address"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ValidatorManagerForm from './ValidatorManagerForm.vue';

import { mdiClose } from '@mdi/js';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorManager',
  components: {
    ValidatorManagerForm,
  },
  props: ['address', 'commission', 'moniker'],
  data() {
    return {
      mdiClose,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('keplr', ['isInitialized']),
    ...mapGetters('validators', ['isLoadingWallet', 'wallet', 'list']),
    commissionComplete() {
      const commission = this.formatAsPercentage(this.commission);
      return `${this.$t('labels.commission')}: ${commission}`;
    },
    delegations() {
      return this.wallet.delegations.map((el) => {
        const index = this.list.findIndex(
          (it) => it.operator_address === el.delegation.validator_address
        );
        let moniker = '';
        if (index > -1) {
          moniker = this.list[index]['moniker'];
        }
        const delegation = {
          moniker,
          address: el.delegation.validator_address,
          amount: parseInt(el.balance.amount) / 1000000,
          denom: 'COM',
        };
        return delegation;
      });
    },
  },
  methods: {
    formatAsPercentage(amount) {
      if (!amount) return '-';
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(amount);
    },
  },
};
</script>
