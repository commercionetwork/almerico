<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.address')"
        :content="address"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: address },
        }"
        look="font-monotype"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgUnjail',
  description: 'Display an unjail transaction message',
  components: {
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an unjail message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    address() {
      return this.message.address || '-';
    },
  },
};
</script>
