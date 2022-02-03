<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <DetailLinkComponent
        :label="$t('labels.depositor')"
        :content="depositorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: depositorAddress },
        }"
        look="font-monotype"
      />
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <DetailItemComponent
          :label="$t('labels.amount')"
          :content="amount"
          :isLoop="true"
          look="text-uppercase"
        />
      </v-list-item>
      <DetailItemComponent :label="$t('labels.id')" :content="id" />
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
  name: 'MsgMintCCC',
  description: 'Display a mintCCC transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a mintCCC message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    depositorAddress() {
      return this.message.depositor;
    },
    amounts() {
      return this.message.deposit_amount.map((amount) =>
        coinAdapter.format({
          amount: amount.amount,
          denom: amount.denom,
        }),
      );
    },
    id() {
      return this.message.ID;
    },
  },
};
</script>
