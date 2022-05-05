<template>
  <v-list dense>
    <v-list-item v-for="(value, key) in content" :key="key">
      <BaseDetailItem :label="key" :content="value" :is-loop="true" />
    </v-list-item>
  </v-list>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';

export default {
  name: 'ContentDefault',
  components: { BaseDetailItem },
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
};
</script>
