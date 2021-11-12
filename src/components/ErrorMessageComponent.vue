<template>
  <div>
    <AlertComponent kind="error" :message="$t('msgs.errorOccurred')" />
    <v-card outlined>
      <v-card-title v-text="$t('titles.details')" />
      <v-card-text>
        <v-list>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="pb-1" v-text="$t('titles.message')" />
              <v-list-item-subtitle class="pb-1 text-wrap" v-text="message" />
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="pb-1" v-text="$t('titles.code')" />
              <v-list-item-subtitle class="pb-1 text-wrap" v-text="code" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import AlertComponent from '@/components/AlertComponent.vue';

import errorHandler from './helpers/errorHandler';

export default {
  name: 'ErrorMessageComponent',
  components: {
    AlertComponent,
  },
  props: {
    error: {
      type: Error,
      required: true,
      note: 'The error to display',
    },
  },
  computed: {
    message() {
      return this.processedError &&
        this.processedError.data &&
        this.processedError.data.message
        ? this.processedError.data.message
        : this.$t('msgs.noMessage');
    },
    code() {
      return this.processedError && this.processedError.status
        ? this.processedError.status
        : this.$t('msgs.noCode');
    },
    processedError() {
      return this.error
        ? errorHandler.process(this.$t, this, this.error)
        : null;
    },
  },
};
</script>
