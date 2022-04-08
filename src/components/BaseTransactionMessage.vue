<template>
  <v-card outlined class="mb-3" :id="id">
    <v-card-text>
      <v-list class="text-break">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="pb-1 font-weight-bold">
              <div class="d-flex flex-row align-center">
                <span v-text="title" />
                <slot name="export" />
              </div>
            </v-list-item-title>
            <v-list-item-subtitle
              class="pb-1 text-capitalize font-italic"
              v-text="subtitle"
            />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <slot name="body" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { regExpBuilder } from '@/utils';

export default {
  name: 'BaseTransactionMessage',
  description: 'Container for a transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a tx message',
    },
    id: {
      type: String,
      default: '',
      note: 'The message id',
    },
  },
  computed: {
    subtitle() {
      const firstSegments = this.message['@type'].match(
        regExpBuilder.getSourceRegExp()
      )[0];
      return firstSegments.substring(1);
    },
    title() {
      const lastSegment = this.message['@type'].match(
        regExpBuilder.getTypeRegExp()
      )[0];
      return lastSegment.substring(1);
    },
  },
};
</script>
