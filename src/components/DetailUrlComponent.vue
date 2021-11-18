<template>
  <v-list-item>
    <v-list-item-content>
      <div class="text-capitalize font-weight-bold" v-text="label" />
      <a :class="look" :href="link" target="_blank" v-text="content" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'DetailUrlComponent',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The link label',
    },
    content: {
      type: String,
      required: true,
      note: 'The item value',
    },
    link: {
      type: String,
      required: true,
      note: 'The link value',
    },
    look: {
      type: String,
      default: '',
      note: 'The datum custom style',
    },
  },
};
</script>
