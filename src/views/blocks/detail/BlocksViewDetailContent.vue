<template>
  <v-row>
    <v-col cols="12" md="6">
      <blocks-view-detail-height :detail="detail" :proposer="proposer" />
    </v-col>
    <v-col cols="12" md="6">
      <blocks-view-detail-transactions
        :items="items"
        :height="detail.block.header.height"
      />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewDetailHeight from './BlocksViewDetailHeight.vue';
import BlocksViewDetailTransactions from './BlocksViewDetailTransactions.vue';

import { CONFIG } from '@/constants';
import { mapGetters } from 'vuex';
import { proposerHandler, txsTableAdapter } from '@/utils';

export default {
  name: 'BlocksViewDetailContent',
  components: {
    BlocksViewDetailHeight,
    BlocksViewDetailTransactions,
  },
  computed: {
    ...mapGetters('application', ['validators']),
    ...mapGetters('blocks', ['blockTxs', 'blockValidatorSets', 'detail']),
    items() {
      return txsTableAdapter.build({
        txs: this.blockTxs,
        labels: {
          multiTypes: this.$t('labels.multiTypes'),
          multiValues: this.$t('labels.multiValues'),
        },
      });
    },
    proposer() {
      return proposerHandler.getFromHexAddress({
        address: this.detail.block.header.proposer_address,
        prefix: CONFIG.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
        validatorSets: this.blockValidatorSets,
        validators: this.validators,
      });
    },
  },
};
</script>
