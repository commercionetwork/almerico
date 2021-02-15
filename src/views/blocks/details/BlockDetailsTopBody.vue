<template>
  <v-row>
    <v-col cols="12" md="5">
      <BlockDetailsSpec :height="height" />
    </v-col>
    <v-col cols="12" md="7">
      <BlockDetailsTransactions :height="height" />
    </v-col>
  </v-row>
</template>

<script>
import BlockDetailsSpec from './BlockDetailsSpec';
import BlockDetailsTransactions from './BlockDetailsTransactions';

export default {
  name: 'BlockDetailsTopBody',
  components: {
    BlockDetailsSpec,
    BlockDetailsTransactions,
  },
  props: {
    height: {
      type: String,
      required: true,
      note: 'The block height',
    },
  },
};
</script>
