<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.delegatorAddress')"
        :content="delegatorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: delegatorAddress },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.destinationValidatorAddress')"
        :content="validatorDstAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorDstAddress },
        }"
        look="font-monotype"
      />
      <DetailLinkComponent
        :label="$t('labels.sourceValidatorAddress')"
        :content="validatorSrcAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorSrcAddress },
        }"
        look="font-monotype"
      />
      <DetailItemComponent
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgBeginRedelegate',
  description: 'Display a begin redelegate transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a redelegate message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    delegatorAddress() {
      return this.message.delegator_address;
    },
    validatorDstAddress() {
      return this.message.validator_dst_address;
    },
    validatorSrcAddress() {
      return this.message.validator_src_address;
    },
    amount() {
      return coinAdapter.format({
        amount: this.message.amount.amount,
        denom: this.message.amount.denom,
      });
    },
  },
};
</script>
