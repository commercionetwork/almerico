<template>
  <v-list>
    <BaseDetailItem :label="$t('labels.type')" :content="type" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-capitalize"
          v-text="$t('labels.changes')"
        />
        <v-list v-for="(change, index) in changes" :key="index">
          <v-list-item>
            <BaseDetailItem :label="$t('labels.key')" :content="change.key" />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem
              :label="$t('labels.subspace')"
              :content="change.subspace"
            />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem
              :label="$t('labels.value')"
              :content="change.value"
            />
          </v-list-item>
        </v-list>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';

export default {
  name: 'ParameterChangeProposal',
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
    changes() {
      return this.content.changes || [];
    },
  },
};
</script>
