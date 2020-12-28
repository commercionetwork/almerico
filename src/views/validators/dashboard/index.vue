<template>
  <v-row>
    <v-col cols="12">
      <ValidatorsHeader />
      <ValidatorsTopBody />
      <ValidatorsMiddleBody />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorsHeader from "./ValidatorsHeader";
import ValidatorsMiddleBody from "./ValidatorsMiddleBody";
import ValidatorsTopBody from "./ValidatorsTopBody";

export default {
  name: "Validators",
  components: {
    ValidatorsHeader,
    ValidatorsMiddleBody,
    ValidatorsTopBody,
  },
};
</script>
