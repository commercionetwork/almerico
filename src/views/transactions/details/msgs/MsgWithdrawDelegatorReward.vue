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
          label="validator address"
          :content="validatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: validatorAddress }
          }"
        />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgLink from "@/components/MsgLink.vue";
import MsgTx from "@/components/MsgTx.vue";

import { ROUTES } from "@/constants";

export default {
  name: "MsgWithdrawDelegatorReward",
  description: "Display a withdraw delegator reward transaction message",
  components: {
    MsgLink,
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a withdraw delegator reward message"
    }
  },
  data: () => ({
    ROUTES
  }),
  computed: {
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : "-";
    },
    subTitle() {
      return this.message.type ? this.message.type.split("/").shift() : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
        : "-";
    }
  }
};
</script>
