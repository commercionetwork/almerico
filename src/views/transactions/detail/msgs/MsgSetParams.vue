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
      <DetailItemComponent
        :label="$t('labels.conversionRate')"
        :content="conversionRate"
      />
      <DetailItemComponent
        :label="$t('labels.freezePeriod')"
        :content="freezePeriod"
      />
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
    conversionRate() {
      return this.message.params.conversion_rate;
    },
    freezePeriod() {
      return this.message.params.freeze_period;
    },
    signer() {
      return this.message.signer;
    },
  },
};
</script>
