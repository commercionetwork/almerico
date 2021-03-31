<template>
  <v-layout>
    <v-row>
      <v-col cols="12" sm="5">
        <h1 class="text-h4 text-uppercase primary--text">blocks</h1>
      </v-col>
      <v-col cols="12" sm="7">
        <SearchBarComponent />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import SearchBarComponent from "@/components/SearchBarComponent";

export default {
  name: "BlocksHeader",
  components: {
    SearchBarComponent,
  },
};
</script>