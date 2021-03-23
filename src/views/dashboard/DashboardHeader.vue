<template>
  <v-layout>
    <v-row>
      <v-col cols="12" sm="5">
        <h1 class="text-h4 text-uppercase primary--text">dashboard</h1>
      </v-col>
      <v-col cols="12" sm="5">
        <SearchBar />
      </v-col>
      <v-col cols="12" sm="2">
        <ChainChooser />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ChainChooser from "@/components/ChainChooser";
import SearchBar from "@/components/SearchBar";

export default {
  name: "DashboardHeader",
  components: {
    ChainChooser,
    SearchBar,
  },
};
</script>