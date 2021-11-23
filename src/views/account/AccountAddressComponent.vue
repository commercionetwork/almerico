<template>
  <div class="pl-md-2 text-center text-md-left">
    <div class="text-capitalize" v-text="$t('labels.address')" />
    <div class="text-break font-weight-bold font-monotype" v-text="address" />
    <v-btn plain @click="openDialog">
      {{ $t('labels.scan') }}
      <v-icon right>mdi-qrcode</v-icon>
    </v-btn>
    <v-tooltip top v-model="show">
      <template v-slot:activator="{}">
        <v-btn plain @click="copyToClipboard">
          {{ $t('labels.copy') }}
          <v-icon right>mdi-content-copy</v-icon>
        </v-btn>
      </template>
      <span v-text="$t('msgs.copied')" />
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AccountAddressComponent',
  props: {
    address: {
      type: String,
      default: '',
      note: 'The account address',
    },
  },
  data: () => ({
    show: false,
  }),
  methods: {
    copyToClipboard() {
      if (this.show) {
        this.show = false;
        return;
      }
      navigator.clipboard.writeText(this.address).then(() => {
        this.show = true;
        setTimeout(() => {
          if (this.show) this.show = false;
        }, 500);
      });
    },
    openDialog() {
      this.$emit('open-qrcode');
    },
  },
};
</script>
