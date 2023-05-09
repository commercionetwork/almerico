<template>
  <v-list>
    <base-detail-item :label="$t('labels.type')" :content="type" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <span class="text-capitalize" v-text="$t('labels.changes')" />
        </v-list-item-title>
        <v-list v-for="(change, index) in changes" :key="index">
          <v-list-item>
            <base-detail-item :label="$t('labels.key')" :content="change.key" />
          </v-list-item>
          <v-list-item>
            <base-detail-item
              :label="$t('labels.subspace')"
              :content="change.subspace"
            />
          </v-list-item>
          <v-list-item>
            <base-detail-item
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
export default {
  name: 'ParameterChangeProposal',
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
