<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="pb-1 font-monotype wrap-text"
              v-text="tx.hash"
            />
            <v-list-item-subtitle
              class="pb-1 font-weight-bold"
              v-text="$t('labels.hash')"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <BaseDetailItem :label="$t('labels.time')" :content="tx.time" />
        <BaseDetailItem
          :label="$t('labels.status')"
          :content="tx.status.label"
          :look="tx.status.code === 1 ? 'info--text' : 'error--text'"
        />
        <BaseDetailItem
          v-if="!tx.status.code"
          :label="$t('labels.rawLog')"
          :content="tx.rawLog"
          look="font-italic"
        />
        <BaseDetailItem
          :label="$t('labels.fee')"
          :content="tx.fee"
          look="text-uppercase"
        />
        <BaseDetailItem :label="$t('labels.gasUsedWanted')" :content="tx.gas" />
        <BaseDetailLink
          v-if="!tx.version"
          :label="$t('labels.height')"
          :content="tx.height"
          :route="{
            name: ROUTES.NAME.BLOCKS_DETAIL,
            params: { id: tx.height },
          }"
          look="text-decoration-none"
        />
        <BaseDetailItem
          v-else
          :label="$t('labels.height')"
          :content="tx.height"
        />
        <v-divider />
        <BaseDetailUrl
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
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseDetailUrl from '@/components/BaseDetailUrl.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'TheTransactionsCommonContent',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseDetailUrl,
  },
  props: {
    tx: {
      type: Object,
      required: true,
      note: 'The transaction to display',
    },
  },
  data: () => ({
    ROUTES,
  }),
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
