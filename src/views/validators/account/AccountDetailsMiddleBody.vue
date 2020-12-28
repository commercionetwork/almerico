<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="6">
        <AccountDetailsDelegations />
      </v-col>
      <v-col cols="12" md="6">
        <AccountDetailsUnbondings />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import AccountDetailsDelegations from "./AccountDetailsDelegations";
import AccountDetailsUnbondings from "./AccountDetailsUnbondings";

export default {
  name: "AccountDetailsMiddleBody",
  components: {
    AccountDetailsDelegations,
    AccountDetailsUnbondings,
  },
};
</script>