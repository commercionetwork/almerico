<template>
  <v-alert border="left" color="info" colored-border>
    <div class="pb-2" v-text="$t('msgs.assertAndShowHash')" />
    <div>
      <span
        class="text-break font-weight-bold font-monotype"
        style="font-size: 0.8rem"
        v-text="hash"
      />
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="copyToClipboard">
            <v-icon small>
              {{ !copied ? mdiContentCopy : mdiCheckAll }}
            </v-icon>
          </v-btn>
        </template>
        <span v-text="$t('msgs.copy')" />
      </v-tooltip>
    </div>
  </v-alert>
</template>

<script>
import { mdiContentCopy, mdiCheckAll } from '@mdi/js';

export default {
  name: 'AssetsModalIbcTransferResult',
  props: {
    hash: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mdiContentCopy,
      mdiCheckAll,
      copied: false,
    };
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.hash).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1000);
      });
    },
  },
};
</script>
