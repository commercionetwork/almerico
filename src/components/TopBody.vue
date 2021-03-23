<template>
  <v-layout>
    <v-row>
      <v-col cols="12" md="4" order="1">
        <slot name="left" />
      </v-col>
      <v-col cols="12" md="4" order="3" order-md="2">
        <slot name="center" />
      </v-col>
      <v-col cols="12" md="4" order="2" order-md="3">
        <slot name="right" />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "TopBody",
};
</script>