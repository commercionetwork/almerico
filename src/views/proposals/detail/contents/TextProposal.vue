<template>
  <v-list>
    <base-detail-item :label="$t('labels.type')" :content="type" />
  </v-list>
</template>

<script>
export default {
  name: 'TextProposal',
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
  computed: {
    type() {
      return this.content['@type'] || '-';
    },
  },
};
</script>
