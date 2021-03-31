<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="signer"
          :content="signerAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: signerAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="amount" :content="amount" class="text-uppercase" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="id" :content="id" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from "@/components/MsgItemComponent.vue";
import MsgLinkComponent from "@/components/MsgLinkComponent.vue";
import MsgTxComponent from "@/components/MsgTxComponent.vue";

import { ROUTES } from "@/constants";
import { coinAdapter } from "@/utils";

export default {
  name: "MsgBurnCCC",
  description: "Display a burnCCC transaction message",
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a burnCCC message"
    }
  },
  data: () => ({
    ROUTES
  }),
  computed: {
    amount() {
      return coinAdapter.format({
        amount: this.message.value.amount.amount,
        denom: this.message.value.amount.denom
      });
    },
    id() {
      return this.message.value.id ? this.message.value.id : "-";
    },
    signerAddress() {
      return this.message.value.signer ? this.message.value.signer : "-";
    },
    subTitle() {
      return this.message.type ? this.message.type.split("/").shift() : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  }
};
</script>
