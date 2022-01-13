<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.signer')"
        :content="signer"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: signer },
        }"
        look="font-monotype"
      />
      <DetailItemComponent :label="$t('labels.rate')" :content="rate" />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetCCCConversionRate',
  description: 'Display a transaction message of set conversion rate type',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set conversion rate message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    signer() {
      return this.message.signer;
    },
    rate() {
      return this.message.rate;
    },
  },
};
</script>
