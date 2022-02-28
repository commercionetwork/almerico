<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <AccountViewAddressMembership />
    <v-divider class="mx-3" />
    <v-card-text>
      <div class="pl-md-2 text-center text-md-left">
        <div>
          <span class="text-capitalize" v-text="$t('labels.address')" />
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="copyToClipboard">
                <v-icon small>
                  {{ !copied ? 'mdi-content-copy' : 'mdi-check-all' }}
                </v-icon>
              </v-btn>
            </template>
            <span v-text="$t('msgs.copy')" />
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="openDialog">
                <v-icon small>mdi-qrcode</v-icon>
              </v-btn>
            </template>
            <span v-text="$t('msgs.scan')" />
          </v-tooltip>
          <AccountViewModalQRCode v-model="dialog" :address="address" />
        </div>
        <div
          class="text-break font-weight-bold font-monotype"
          v-text="address"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import AccountViewAddressMembership from './AccountViewAddressMembership.vue';
import AccountViewModalQRCode from './AccountViewModalQRCode.vue';

export default {
  name: 'AccountViewAddress',
  components: {
    AccountViewAddressMembership,
    AccountViewModalQRCode,
  },
  data: () => ({
    copied: false,
    dialog: false,
  }),
  computed: {
    address() {
      return this.$route.params.id;
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.address).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1000);
      });
    },
    openDialog() {
      this.dialog = true;
    },
  },
};
</script>
