<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLinkComponent
          label="delegator address"
          :content="delegatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: delegatorAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="validator address"
          :content="validatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: validatorAddress }
          }"
        />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgLinkComponent from "@/components/MsgLinkComponent.vue";
import MsgTxComponent from "@/components/MsgTxComponent.vue";

import { ROUTES } from "@/constants";

export default {
  name: "MsgWithdrawDelegatorReward",
  description: "Display a withdraw delegator reward transaction message",
  components: {
    MsgLinkComponent,
    MsgTxComponent
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
