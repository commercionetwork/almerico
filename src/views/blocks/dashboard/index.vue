<template>
  <v-row>
    <v-col cols="12">
      <BlocksHeader />
      <BlocksTopBody />
      <BlocksMiddleBody />
    </v-col>
  </v-row>
</template>

<script>
import BlocksHeader from "./BlocksHeader";
import BlocksMiddleBody from "./BlocksMiddleBody";
import BlocksTopBody from "./BlocksTopBody";

export default {
  name: "Blocks",
  components: {
    BlocksHeader,
    BlocksMiddleBody,
    BlocksTopBody,
  },
};
</script>
