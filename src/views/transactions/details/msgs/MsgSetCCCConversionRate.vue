<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="signer"
          :content="signer"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: signer },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="rate" :content="rate" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgSetCCCConversionRate',
  description: 'Display a transaction message of set conversion rate type',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
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
    rate() {
      return this.message.value.rate ? this.message.value.rate : '-';
    },
    signer() {
      return this.message.value.signer ? this.message.value.signer : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
