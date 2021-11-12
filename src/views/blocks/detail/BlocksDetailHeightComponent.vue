<template>
  <v-card outlined>
    <v-card-text>
      <div v-text="detail.block.header.height" class="text-h6" />
      <div v-text="$t('labels.height')" class="font-weight-bold" />
    </v-card-text>
    <v-divider class="mx-3" />
    <v-card-text>
      <v-list>
        <DetailItemComponent :label="$t('labels.time')" :content="time" />
        <DetailItemComponent
          :label="$t('labels.hash')"
          :content="hash"
          look="font-monotype"
        />
        <DetailItemComponent :label="$t('labels.txsAmount')" :content="txs" />
        <DetailLinkComponent
          :label="$t('labels.proposer')"
          :content="proposer.description.moniker"
          :route="{
            name: ROUTES.NAME.VALIDATORS_DETAIL,
            params: { id: proposer.operator_address },
          }"
          look="text-decoration-none"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'BlocksDetailHeightComponent',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
  },
  props: {
    detail: {
      type: Object,
      required: true,
      note: 'The item to display',
    },
    proposer: {
      type: Object,
      required: true,
      note: 'The block proposer',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    hash() {
      return this.detail.block_id.hash;
    },
    time() {
      return new Date(this.detail.block.header.time).toLocaleString();
    },
    txs() {
      return this.detail.block.data.txs.length;
    },
  },
};
</script>
