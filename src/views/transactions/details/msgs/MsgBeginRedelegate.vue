<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLink
          label="delegator address"
          :content="delegatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: delegatorAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="destination validator address"
          :content="validatorDstAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: validatorDstAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLink
          label="source validator address"
          :content="validatorSrcAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: validatorSrcAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItem label="amount" :content="amount" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from "@/components/MsgItem.vue";
import MsgLink from "@/components/MsgLink.vue";
import MsgTx from "@/components/MsgTx.vue";

import { ROUTES } from "@/constants";
import { coinAdapter } from "@/utils";

export default {
  name: "MsgBeginRedelegate",
  description: "Display a begin redelegate transaction message",
  components: {
    MsgItem,
    MsgLink,
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a redelegate message"
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
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : "-";
    },
    subTitle() {
      return this.message.type ? this.message.type.split("/").shift() : "-";
    },
    validatorDstAddress() {
      return this.message.value.validator_dst_address
        ? this.message.value.validator_dst_address
        : "-";
    },
    validatorSrcAddress() {
      return this.message.value.validator_src_address
        ? this.message.value.validator_src_address
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  }
};
</script>
