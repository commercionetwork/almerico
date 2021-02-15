<template>
  <v-list-item-content>
    <div>
      <span class="pr-3 text-capitalize font-weight-bold" v-text="label" />
      <router-link :to="to" v-text="content" />
    </div>
  </v-list-item-content>
</template>

<script>
export default {
  name: 'MsgLink',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The item label',
    },
    content: {
      type: String,
      required: true,
      note: 'The item content',
    },
    to: {
      type: Object,
      required: true,
      note: 'The item link',
    },
  },
};
</script>
