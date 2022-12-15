<template>
  <v-card outlined>
    <v-card-text v-if="isVerified">
      <v-alert dense dismissible :type="alertType" @input="reset">
        <span class="text-body-2" v-text="hash" />
      </v-alert>
    </v-card-text>
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
import { mdiCloudUpload, mdiUpload } from '@mdi/js';
import transactionsVerifyHelper from './helpers/transactionsVerifyHelper';

export default {
  name: 'TransactionsViewSharedocFileVerify',
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
      isVerified: false,
      verify: false,
      file: null,
      hash: '',
    };
  },
  computed: {
    alertType() {
      return this.verify ? 'success' : 'error';
    },
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
      if (this.hash.toLowerCase() === this.checksumValue.toLowerCase()) {
        this.verify = true;
      }
      this.isDragover = false;
      this.isVerified = true;
    },
    reset() {
      this.isVerified = false;
      this.verify = false;
      this.hash = '';
    },
  },
};
</script>

<style scoped>
.drag-area {
  border: 5px dashed;
}
</style>
