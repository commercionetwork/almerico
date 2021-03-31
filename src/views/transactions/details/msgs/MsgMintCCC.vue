<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="depositor"
          :content="depositorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: depositorAddress }
          }"
        />
      </v-list-item>
      <v-list-item v-for="(amount, index) in amounts" :key="index">
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
  name: "MsgMintCCC",
  description: "Display a mintCCC transaction message",
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a mintCCC message"
    }
  },
  data: () => ({
    ROUTES
  }),
  computed: {
    amounts() {
      let amounts = [];
      for (const amount of this.message.value.deposit_amount) {
        amounts.push(
          coinAdapter.format({
            amount: amount.amount,
            denom: amount.denom
          })
        );
      }
      return amounts;
    },
    depositorAddress() {
      return this.message.value.depositor ? this.message.value.depositor : "-";
    },
    id() {
      return this.message.value.id ? this.message.value.id : "-";
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
