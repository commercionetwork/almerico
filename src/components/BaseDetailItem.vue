<template>
  <v-list-item-content v-if="isLoop">
    <v-list-item-title class="py-1 text-capitalize" v-text="label" />
    <v-list-item-subtitle
      class="py-1 word-break"
      :class="look"
      v-text="content"
    />
  </v-list-item-content>
  <v-list-item v-else>
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
  name: 'BaseDetailItem',
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
    isLoop: {
      type: Boolean,
      default: false,
      note: 'true if used within a v-for loop',
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
