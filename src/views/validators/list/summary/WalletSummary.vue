<template>
  <v-row>
    <v-col cols="12">
      <v-card :loading="isLoadingWallet" outlined>
        <v-row class="px-1 px-md-2 py-1">
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="3">
                <WalletSummaryItem
                  :label="$t('labels.total')"
                  :amount="capital.total"
                />
              </v-col>
              <v-col cols="12" md="3">
                <WalletSummaryItem
                  :label="$t('labels.availables')"
                  :amount="capital.availables"
                />
              </v-col>
              <v-col cols="12" md="3">
                <WalletSummaryItem
                  :label="$t('labels.delegations')"
                  :amount="capital.delegations"
                />
              </v-col>
              <v-col cols="12" md="3">
                <WalletSummaryItem
                  :label="$t('labels.unbondings')"
                  :amount="capital.unbondings"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4">
            <WalletSummaryClaim :amount="capital.rewards" />
          </v-col>
        </v-row>
        <v-divider />
        <WalletSummaryTable />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import WalletSummaryClaim from './WalletSummaryClaim.vue';
import WalletSummaryItem from './WalletSummaryItem.vue';
import WalletSummaryTable from './WalletSummaryTable.vue';

import walletBalanceHelper from '../helpers/walletBalanceHelper';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'WalletSummary',
  components: {
    WalletSummaryClaim,
    WalletSummaryItem,
    WalletSummaryTable,
  },
  computed: {
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('validators', ['isLoadingWallet', 'wallet']),
    capital() {
      return walletBalanceHelper.build({
        wallet: this.wallet,
        bondDenom: this.stakingParams.bond_denom,
      });
    },
  },
  created() {
    this.initWallet();
  },
  methods: {
    ...mapActions('validators', ['initWallet']),
  },
};
</script>
