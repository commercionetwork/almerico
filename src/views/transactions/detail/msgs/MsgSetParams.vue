<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.government')"
        :content="government"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: government },
        }"
        look="font-monotype"
      />
      <DetailItemComponent
        :label="$t('labels.distrEpochIdentifier')"
        :content="distrEpochIdentifier"
      />
      <DetailItemComponent :label="$t('labels.earnRate')" :content="earnRate" />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetParams',
  description: 'Display a set params transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    distrEpochIdentifier() {
      return this.message.distr_epoch_identifier;
    },
    earnRate() {
      return this.message.earn_rate;
    },
    government() {
      return this.message.Government;
    },
  },
};
</script>
