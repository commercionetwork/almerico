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
        <MsgItemComponent
          label="freeze period"
          :content="freezePeriod"
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

export default {
  name: 'MsgSetCCCFreezePeriod',
  description: 'Display a transaction message of set freeze period type',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
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
    freezePeriod() {
      return this.message.value.freeze_period
        ? `${this.message.value.freeze_period} s`
        : '-';
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
