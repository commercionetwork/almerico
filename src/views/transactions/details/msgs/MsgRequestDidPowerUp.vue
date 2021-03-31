<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="claimant"
          :content="claimantAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: claimantAddress }
          }"
        />
      </v-list-item>
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <MsgItemComponent label="amount" :content="amount" class="text-uppercase" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="proof" :content="proof" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="id" :content="id" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="proof key" :content="proofKey" />
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
  name: "MsgRequestDidPowerUp",
  description: "Display a request did power up transaction message",
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a request did power up message"
    }
  },
  data: () => ({
    ROUTES
  }),
  computed: {
    amounts() {
      let amounts = [];
      for (const amount of this.message.value.amount) {
        amounts.push(
          coinAdapter.format({
            amount: amount.amount,
            denom: amount.denom
          })
        );
      }
      return amounts;
    },
    claimantAddress() {
      return this.message.value.claimant ? this.message.value.claimant : "-";
    },
    id() {
      return this.message.value.id ? this.message.value.id : "-";
    },
    proof() {
      return this.message.value.proof ? this.message.value.proof : "-";
    },
    proofKey() {
      return this.message.value.proof_key ? this.message.value.proof_key : "-";
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
