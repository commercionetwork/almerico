<template>
  <v-list-item-content>
    <div>
      <span class="pr-3 text-capitalize font-weight-bold" v-text="label" />
      <span v-text="content" />
    </div>
  </v-list-item-content>
</template>

<script>
export default {
  name: 'MsgItemComponent',
  props: {
    label: {
      type: String,
      required: true,
      note: 'The item label',
    },
    content: {
      required: true,
      note: 'The item content',
    },
  },
};
</script>
