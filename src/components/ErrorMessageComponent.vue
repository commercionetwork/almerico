<template>
  <div>
    <AlertComponent kind="info" :message="$t('msgs.dataNotAvailable')">
      <template v-slot:action>
        <v-btn color="info" outlined @click="refresh">
          <v-icon>mdi-reload</v-icon>
          <span v-text="$t('labels.refresh')" />
        </v-btn>
      </template>
    </AlertComponent>
    <v-row justify="center">
      <v-col>
        <v-expansion-panels flat poput>
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('labels.moreInfo') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="pb-1"
                      v-text="$t('titles.message')"
                    />
                    <v-list-item-subtitle
                      class="pb-1 text-wrap"
                      v-text="message"
                    />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title
                      class="pb-1"
                      v-text="$t('titles.code')"
                    />
                    <v-list-item-subtitle
                      class="pb-1 text-wrap"
                      v-text="code"
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
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
  methods: {
    refresh() {
      window.location.reload();
    },
  },
};
</script>
