<template>
  <v-card outlined>
    {{ item }}
  </v-card>
</template>

<script>
export default {
  name: 'ProposalsViewListItem',
  props: {
    item: {
      type: Object,
      required: true,
      note: 'The proposal to display',
    },
  },
};
</script>
