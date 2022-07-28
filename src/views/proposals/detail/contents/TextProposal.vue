<template>
  <v-list>
    <BaseDetailItem :label="$t('labels.type')" :content="type" />
  </v-list>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';

export default {
  name: 'TextProposal',
  components: { BaseDetailItem },
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
