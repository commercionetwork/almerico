<template>
  <v-card outlined class="mb-3">
    <v-card-text>
      <v-list class="text-break">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="pb-1 font-weight-bold"
              v-text="$t('titles.message')"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="(value, key) in message" :key="key">
          <BaseDetailItem
            :label="formatKey(key)"
            :content="value"
            :isLoop="true"
          />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';

export default {
  name: 'MsgDefault',
  components: { BaseDetailItem },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a message',
    },
  },
  methods: {
    formatKey(str) {
      return str.replace(/_/g, ' ');
    },
  },
};
</script>
