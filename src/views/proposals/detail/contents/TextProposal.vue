<template>
  <v-list>
    <BaseDetailItem :label="$t('labels.type')" :content="type" />
    <BaseDetailItem :label="$t('labels.title')" :content="title" />
    <BaseDetailItem :label="$t('labels.description')" :content="description" />
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
    title() {
      return this.content.title || `-`;
    },
    description() {
      return this.content.description || `-`;
    },
  },
};
</script>
