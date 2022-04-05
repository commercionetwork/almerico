<template>
  <v-dialog v-model="show" max-width="500">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="primary--text" v-text="$t('titles.qrCode')" />
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon color="grey" dark @click="show = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="text-center">
        <QrcodeVue :value="address" size="200" level="H" class="py-5" />
        <v-divider />
        <div class="pt-1 text-caption" v-text="$t('msgs.scanAddress')" />
        <div class="pb-1 font-monotype" v-text="address" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue';
import { mdiClose } from '@mdi/js';

export default {
  name: 'AccountViewModalQRCode',
  components: { QrcodeVue },
  props: {
    value: Boolean,
    address: {
      type: String,
      default: '',
      note: 'The account address',
    },
  },
  emits: [`input`],
  data() {
    return { mdiClose };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
