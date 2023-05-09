<template>
  <v-list-item :to="to">
    <v-list-item-icon>
      <v-icon>
        {{ icon }}
      </v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      <span v-text="title" />
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: 'BaseDrawerMenuItem',
  props: {
    icon: {
      type: String,
      required: true,
      note: "The item's image",
    },
    title: {
      type: String,
      required: true,
      note: "The item's label",
    },
    to: {
      type: Object,
      required: true,
      note: "The item's link",
    },
  },
};
</script>
