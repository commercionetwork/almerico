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
        <DetailItemComponent :label="$t('labels.time')" :content="tx.time" />
        <DetailItemComponent
          :label="$t('labels.status')"
          :content="tx.status.label"
          :look="tx.status.code === 1 ? 'info--text' : 'error--text'"
        />
        <DetailItemComponent
          v-if="!tx.status.code"
          :label="$t('labels.rawLog')"
          :content="tx.rawLog"
          look="font-italic"
        />
        <DetailItemComponent
          :label="$t('labels.fee')"
          :content="tx.fee"
          look="text-uppercase"
        />
        <DetailItemComponent
          :label="$t('labels.gasUsedWanted')"
          :content="tx.gas"
        />
        <DetailLinkComponent
          v-if="!tx.version"
          :label="$t('labels.height')"
          :content="tx.height"
          :route="{
            name: ROUTES.NAME.BLOCKS_DETAIL,
            params: { id: tx.height },
          }"
          look="text-decoration-none"
        />
        <DetailItemComponent
          v-else
          :label="$t('labels.height')"
          :content="tx.height"
        />
        <v-divider />
        <DetailUrlComponent
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
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import DetailUrlComponent from '@/components/DetailUrlComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'TransactionsSharedocCommonContentComponent',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    DetailUrlComponent,
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
