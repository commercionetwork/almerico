<template>
  <v-row>
    <v-col cols="12" sm="5">
      <h1 class="text-h4 text-uppercase primary--text" v-text="title" />
    </v-col>
    <v-col cols="12" :sm="hasOptionalContent ? 5 : 7">
      <the-search-bar />
    </v-col>
    <v-col v-if="hasOptionalContent" cols="12" sm="2">
      <slot />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TheHeaderContent',
  props: {
    title: {
      type: String,
      required: true,
      note: 'Main title',
    },
    hasOptionalContent: {
      type: Boolean,
      default: false,
      note: 'Optional content',
    },
  },
};
</script>
