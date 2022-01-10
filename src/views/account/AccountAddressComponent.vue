<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <AccountAddressMembershipComponent />
    <v-divider class="mx-3" />
    <v-card-text>
      <div class="pl-md-2 text-center text-md-left">
        <div class="text-capitalize" v-text="$t('labels.address')" />
        <div
          class="text-break font-weight-bold font-monotype"
          v-text="address"
        />
        <div class="py-3">
          <span class="px-1">
            <v-btn outlined @click="openDialog">
              {{ $t('labels.scan') }}
              <v-icon right>mdi-qrcode</v-icon>
            </v-btn>
          </span>
          <AccountQRCodeComponent v-model="dialog" :address="address" />
          <v-tooltip top v-model="tooltip">
            <template v-slot:activator="{}">
              <span class="px-1">
                <v-btn outlined @click="copyToClipboard">
                  {{ $t('labels.copy') }}
                  <v-icon right>mdi-content-copy</v-icon>
                </v-btn>
              </span>
            </template>
            <span v-text="$t('msgs.copied')" />
          </v-tooltip>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import AccountAddressMembershipComponent from './AccountAddressMembershipComponent.vue';
import AccountQRCodeComponent from './AccountQRCodeComponent.vue';

export default {
  name: 'AccountAddressComponent',
  components: {
    AccountAddressMembershipComponent,
    AccountQRCodeComponent,
  },
  data: () => ({
    dialog: false,
    tooltip: false,
  }),
  computed: {
    address() {
      return this.$route.params.id;
    },
  },
  methods: {
    copyToClipboard() {
      if (this.tooltip) {
        this.tooltip = false;
        return;
      }
      navigator.clipboard.writeText(this.address).then(() => {
        this.tooltip = true;
        setTimeout(() => {
          if (this.tooltip) this.tooltip = false;
        }, 500);
      });
    },
    openDialog() {
      this.dialog = true;
    },
  },
};
</script>
