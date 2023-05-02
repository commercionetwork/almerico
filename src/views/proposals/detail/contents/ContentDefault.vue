<template>
  <v-list>
    <v-list-item v-for="(value, key) in content" :key="key">
      <base-detail-item :label="key" :content="value" :is-loop="true" />
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'ContentDefault',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
