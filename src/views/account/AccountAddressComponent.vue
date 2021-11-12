<template>
  <div class="d-flex flex-column flex-md-row justify-center align-center">
    <v-card color="white" flat class="pa-1">
      <v-btn @click.stop="openDialog" class="pa-1" color="black" icon>
        <v-icon large>mdi-qrcode</v-icon>
      </v-btn>
    </v-card>
    <div class="pl-md-2 text-center text-md-left">
      <div class="text-capitalize" v-text="$t('labels.address')" />
      <div class="text-break font-weight-bold font-monotype" v-text="address" />
    </div>
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
  methods: {
    openDialog() {
      this.$emit('open-qrcode');
    },
  },
};
</script>
