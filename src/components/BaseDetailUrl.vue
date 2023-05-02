<template>
  <v-list-item-content v-if="isLoop">
    <v-list-item-title class="py-1">
      <span v-text="label" />
    </v-list-item-title>
    <v-list-item-subtitle>
      <a
        v-if="link"
        :class="look"
        :href="link"
        target="_blank"
        v-text="content"
      />
      <span v-else v-text="'-'" />
    </v-list-item-subtitle>
  </v-list-item-content>
  <v-list-item v-else>
    <v-list-item-content>
      <v-list-item-title class="py-1">
        <span v-text="label" />
      </v-list-item-title>
      <v-list-item-subtitle>
        <a
          v-if="link"
          :class="look"
          :href="link"
          target="_blank"
          v-text="content"
        />
        <span v-else v-text="'-'" />
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'BaseDetailUrl',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The link label',
    },
    link: {
      type: String,
      required: true,
      note: 'The link value',
    },
    content: {
      type: String,
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
