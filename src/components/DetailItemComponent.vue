<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="py-1 text-capitalize" v-text="label" />
      <v-list-item-subtitle
        class="py-1 word-break"
        :class="look"
        v-text="content"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'DetailItemComponent',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The item label',
    },
    content: {
      required: true,
      note: 'The item value',
    },
    look: {
      type: String,
      default: '',
      note: 'The datum custom style',
    },
  },
};
</script>

<style scoped>
.word-break {
  white-space: normal;
  word-break: break-all;
}
</style>
