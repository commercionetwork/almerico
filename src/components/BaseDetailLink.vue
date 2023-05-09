<template>
  <v-list-item-content v-if="isLoop">
    <v-list-item-title class="py-1">
      <span v-text="label" />
    </v-list-item-title>
    <v-list-item-subtitle>
      <router-link :class="look" :to="route">
        <span v-text="content" />
      </router-link>
    </v-list-item-subtitle>
  </v-list-item-content>
  <v-list-item v-else>
    <v-list-item-content>
      <v-list-item-title class="py-1">
        <span v-text="label" />
      </v-list-item-title>
      <v-list-item-subtitle>
        <router-link :class="look" :to="route">
          <span v-text="content" />
        </router-link>
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'BaseDetailLink',
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
    route: {
      type: Object,
      required: true,
      note: 'The route value',
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
