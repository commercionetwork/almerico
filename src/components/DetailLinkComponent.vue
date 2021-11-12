<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="py-1" v-text="label" />
      <v-list-item-subtitle>
        <router-link :class="look" :to="route" v-text="content" />
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'DetailLinkComponent',
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
    look: {
      type: String,
      default: '',
      note: 'The datum custom style',
    },
    route: {
      type: Object,
      required: true,
      note: 'The route value',
    },
  },
};
</script>
