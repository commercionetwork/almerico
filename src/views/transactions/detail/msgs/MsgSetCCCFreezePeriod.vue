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
  name: 'MsgSetCCCFreezePeriod',
  description: 'Display a transaction message of set freeze period type',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set freeze period message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    signer() {
      return this.message.signer || '-';
    },
    freezePeriod() {
      return `${this.message.freeze_period} s` || '-';
    },
  },
};
</script>
