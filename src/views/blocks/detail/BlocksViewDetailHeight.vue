<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="pb-1 text-h6"
              v-text="detail.block.header.height"
            />
            <v-list-item-subtitle
              class="pb-1 font-weight-bold"
              v-text="$t('labels.height')"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <BaseDetailItem :label="$t('labels.time')" :content="time" />
        <BaseDetailItem
          :label="$t('labels.hash')"
          :content="hash"
          look="font-monotype"
        />
        <BaseDetailItem :label="$t('labels.txsAmount')" :content="txs" />
        <BaseDetailLink
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
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'BlocksViewDetailHeight',
  components: {
    BaseDetailItem,
    BaseDetailLink,
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
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    hash() {
      return this.detail.block_id.hash;
    },
    time() {
      return new Date(this.detail.block.header.time).toLocaleString();
    },
    txs() {
      return this.detail.block.data.txs ? this.detail.block.data.txs.length : 0;
    },
  },
};
</script>
