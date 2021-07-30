<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="primary--text" v-text="'QR Code'" />
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon color="grey" dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="text-center">
        <QrcodeVue :value="address" size="200" level="H" class="py-5" />
        <v-divider />
        <div class="text-caption" v-text="'Scan the address'" />
        <div class="pb-3 font-weight-bold address-font" v-text="address" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'AccountDetailsQRCode',
  components: {
    QrcodeVue,
  },
  props: {
    value: Boolean,
    address: {
      type: String,
      default: '',
      note: 'The account address',
    },
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

<style scoped>
.address-font {
  font-family: monospace;
  font-size: 0.7rem;
}
</style>
