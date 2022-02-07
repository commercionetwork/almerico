<template>
  <v-row>
    <v-col cols="12" md="6">
      <BlocksDetailHeightComponent :detail="detail" :proposer="proposer" />
    </v-col>
    <v-col cols="12" md="6">
      <BlocksDetailTxsComponent
        :items="items"
        :height="detail.block.header.height"
      />
    </v-col>
  </v-row>
</template>

<script>
import BlocksDetailHeightComponent from './BlocksDetailHeightComponent.vue';
import BlocksDetailTxsComponent from './BlocksDetailTxsComponent.vue';

import { CONFIG } from '@/constants';
import { mapGetters } from 'vuex';
import { proposerHandler, txsTableAdapter } from '@/utils';

export default {
  name: 'BlocksDetailContentComponent',
  components: {
    BlocksDetailHeightComponent,
    BlocksDetailTxsComponent,
  },
  computed: {
    ...mapGetters('application', {
      validators: 'validators',
    }),
    ...mapGetters('blocks', {
      detail: 'detail',
      transactions: 'blockTxs',
      validatorSets: 'blockValidatorSets',
    }),
    items() {
      return txsTableAdapter.build({
        txs: this.transactions,
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
        validatorSets: this.validatorSets,
        validators: this.validators,
      });
    },
  },
};
</script>
