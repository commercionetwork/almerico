<template>
  <v-card outlined>
    <TransactionsViewSharedocUnsupported
      :reset="reset"
      v-model="isUnsupported"
    />
    <TransactionsViewSharedocResult
      :hash="hash"
      :reset="reset"
      :result="result"
      v-model="isVerified"
    />
    <v-card-text>
      <v-expansion-panels accordion flat>
        <v-expansion-panel @click="reset">
          <v-expansion-panel-header>
            <span class="font-weight-bold" v-text="$t('labels.verifyHash')" />
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card
              class="drag-area"
              :class="{ 'grey lighten-1': isDragover }"
              flat
              @drop.prevent="onDrop"
              @dragover.prevent="isDragover = true"
              @dragenter.prevent="isDragover = true"
              @dragleave.prevent="isDragover = false"
            >
              <v-card-text>
                <v-row
                  class="d-flex flex-column justify-center align-center"
                  dense
                >
                  <v-icon class="mt-5" size="60">
                    {{ mdiCloudUpload }}
                  </v-icon>
                  <div v-text="$t('msgs.dropYourFile')" />
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div>
                  <v-file-input
                    hide-input
                    :prepend-icon="mdiUpload"
                    v-model="file"
                    @change="onChange"
                  ></v-file-input>
                </div>
              </v-card-actions>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import TransactionsViewSharedocResult from './TransactionsViewSharedocResult.vue';
import TransactionsViewSharedocUnsupported from './TransactionsViewSharedocUnsupported.vue';

import { mdiCloudUpload, mdiUpload } from '@mdi/js';
import transactionsVerifyHelper from './helpers/transactionsVerifyHelper';

export default {
  name: 'TransactionsViewSharedocFileVerify',
  components: {
    TransactionsViewSharedocResult,
    TransactionsViewSharedocUnsupported,
  },
  props: {
    checksumAlgorithm: {
      type: String,
      required: true,
    },
    checksumValue: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mdiCloudUpload,
      mdiUpload,
      isDragover: false,
      isUnsupported: false,
      isVerified: false,
      file: null,
      hash: '',
      result: false,
    };
  },
  methods: {
    async onChange() {
      if (!this.file) {
        return;
      }
      await this.check(this.file);
    },
    async onDrop(event) {
      if (event.dataTransfer.files.length > 1) {
        this.isDragover = false;
        return;
      }
      await this.check(event.dataTransfer.files[0]);
    },
    async check(file) {
      this.reset();
      const content = await transactionsVerifyHelper.getContent(file);
      this.hash = transactionsVerifyHelper.getHash(
        content,
        this.checksumAlgorithm
      );
      if (!this.hash) {
        this.isUnsupported = true;
        this.isDragover = false;
        return;
      }
      if (this.hash.toLowerCase() === this.checksumValue.toLowerCase()) {
        this.result = true;
      }
      this.isDragover = false;
      this.isVerified = true;
    },
    reset() {
      this.hash = '';
      this.isUnsupported = false;
      this.isVerified = false;
      this.result = false;
    },
  },
};
</script>

<style scoped>
.drag-area {
  border: 5px dashed;
}
</style>
