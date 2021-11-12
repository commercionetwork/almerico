<template>
  <v-list-item>
    <v-list-item-content>
      <div class="text-capitalize font-weight-bold" v-text="label" />
      <a :class="look" :href="link" target="_blank" v-text="text" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'TransactionsDetailOfficialNodeComponent',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The link label',
    },
    text: {
      type: String,
      required: true,
      note: 'The item value',
    },
    look: {
      type: String,
      default: '',
      note: 'The datum custom style',
    },
    link: {
      type: String,
      required: true,
      note: 'The link value',
    },
  },
};
</script>
