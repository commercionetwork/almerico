<template>
  <v-layout>
    <TopBody>
      <template v-slot:left>
        <ValidatorDetailsAddress :account="account" :operator="operator" />
      </template>
      <template v-slot:center>
        <ValidatorDetailsChart :delegations="delegations" />
      </template>
      <template v-slot:right>
        <ValidatorDetailsSpec />
      </template>
    </TopBody>
  </v-layout>
</template>

<script>
import TopBody from "@/components/TopBody";
import ValidatorDetailsAddress from "./ValidatorDetailsAddress";
import ValidatorDetailsSpec from "./ValidatorDetailsSpec";
import ValidatorDetailsChart from "./ValidatorDetailsChart";

export default {
  name: "ValidatorDetailsTopBody",
  props: {
    account: {
      type: String,
      required: true,
      note: "The account address",
    },
    operator: {
      type: String,
      required: true,
      note: "The operator address",
    },
    delegations: {
      type: Object,
      required: true,
      note: "The account delegations",
    },
  },
  components: {
    TopBody,
    ValidatorDetailsAddress,
    ValidatorDetailsSpec,
    ValidatorDetailsChart,
  },
};
</script>