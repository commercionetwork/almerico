<template>
  <v-card outlined class="mb-3">
    <v-card-text>
      <v-list class="text-break">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="pb-1 font-weight-bold">
              <span v-text="$t('titles.message')" />
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item v-for="(value, key) in message" :key="key">
          <base-detail-item
            :label="formatKey(key)"
            :content="value"
            :is-loop="true"
          />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MsgDefault',
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
