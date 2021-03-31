<template>
  <v-layout>
    <v-row>
      <v-col cols="12" sm="5">
        <h1 class="text-h4 text-uppercase primary--text">dashboard</h1>
      </v-col>
      <v-col cols="12" sm="5">
        <SearchBarComponent />
      </v-col>
      <v-col cols="12" sm="2">
        <ChainChooserComponent />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ChainChooserComponent from "@/components/ChainChooserComponent";
import SearchBarComponent from "@/components/SearchBarComponent";

export default {
  name: "DashboardHeader",
  components: {
    ChainChooserComponent,
    SearchBarComponent,
  },
};
</script>