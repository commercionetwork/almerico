<template>
  <v-layout>
    <v-row>
      <v-col cols="12" sm="5">
        <h1 class="text-h4 text-uppercase primary--text">validators</h1>
      </v-col>
      <v-col cols="12" sm="7">
        <SearchBar />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import SearchBar from "@/components/SearchBar";

export default {
  name: "ValidatorsHeader",
  components: {
    SearchBar,
  },
};
</script>