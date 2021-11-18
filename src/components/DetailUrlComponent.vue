<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="py-1" v-text="label" />
      <v-list-item-subtitle>
        <a :class="look" :href="link" target="_blank" v-text="content" />
      </v-list-item-subtitle>
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
