<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="pb-1 font-monotype wrap-text">
              <span v-text="tx.hash" />
            </v-list-item-title>
            <v-list-item-subtitle class="pb-1 font-weight-bold">
              <span v-text="$t('labels.hash')" />
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <base-detail-item :label="$t('labels.time')" :content="tx.time" />
        <base-detail-item
          :label="$t('labels.status')"
          :content="tx.status.label"
          :look="tx.status.code === 1 ? 'info--text' : 'error--text'"
        />
        <base-detail-item
          v-if="!tx.status.code"
          :label="$t('labels.rawLog')"
          :content="tx.rawLog"
          look="font-italic"
        />
        <base-detail-item
          :label="$t('labels.fee')"
          :content="tx.fee"
          look="text-uppercase"
        />
        <base-detail-item
          :label="$t('labels.gasUsedWanted')"
          :content="tx.gas"
        />
        <base-detail-link
          v-if="!tx.version"
          :label="$t('labels.height')"
          :content="tx.height"
          :route="{
            name: ROUTES.NAME.BLOCKS_DETAIL,
            params: { id: tx.height },
          }"
          look="text-decoration-none"
        />
        <base-detail-item
          v-else
          :label="$t('labels.height')"
          :content="tx.height"
        />
        <v-divider />
        <base-detail-url
          :label="$t('labels.officialNode')"
          :content="rawJsonLink"
          :link="rawJsonLink"
          look="text-break"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'TheTransactionsCommonContent',
  props: {
    tx: {
      type: Object,
      required: true,
      note: 'The transaction to display',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    rawJsonLink() {
      return `${this.tx.ledger}/txs/${this.tx.hash}`;
    },
  },
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
}
</style>
