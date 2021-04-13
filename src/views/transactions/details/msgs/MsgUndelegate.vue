<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="delegator address"
          :content="delegatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: delegatorAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="validator address"
          :content="validatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: validatorAddress },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent
          label="amount"
          :content="amount"
          class="text-uppercase"
        />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgUndelegate',
  description: 'Display an undelegate transaction message',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an undelegate message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    amount() {
      return coinAdapter.format({
        amount: this.message.value.amount.amount,
        denom: this.message.value.amount.denom,
      });
    },
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
        : '-';
    },
  },
};
</script>
