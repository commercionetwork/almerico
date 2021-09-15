<template>
  <v-row>
    <v-col cols="12" sm="5">
      <h1 class="text-h4 text-uppercase primary--text">
        token exchange rate
      </h1>
    </v-col>
    <v-col cols="12" sm="7">
      <SearchBarComponent />
    </v-col>
  </v-row>
</template>

<script>
import SearchBarComponent from '@/components/SearchBarComponent';

export default {
  name: 'ExchangeRateHeaderComponent',
  components: {
    SearchBarComponent,
  },
};
</script>
