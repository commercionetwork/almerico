<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.delegatorAddress')"
        :content="delegatorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: delegatorAddress },
        }"
      />
      <DetailLinkComponent
        :label="$t('labels.validatorAddress')"
        :content="validatorAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorAddress },
        }"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgWithdrawDelegatorReward',
  description: 'Display a withdraw delegator reward transaction message',
  components: {
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a withdraw delegator reward message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    title() {
      const lastSegment = this.message['@type'].match(
        regExpBuilder.getMessageTypeRegExp(),
      )[0];
      return lastSegment.substring(1);
    },
    subtitle() {
      const firstSegments = this.message['@type'].match(
        regExpBuilder.getMessageSourceRegExp(),
      )[0];
      return firstSegments.substring(1);
    },
    delegatorAddress() {
      return this.message.delegator_address || '-';
    },
    validatorAddress() {
      return this.message.validator_address || '-';
    },
  },
};
</script>
