<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <account-identity-membership />
    <v-divider class="mx-3" />
    <v-card-text>
      <div class="pl-md-2 text-center text-md-left">
        <div>
          <span class="text-capitalize" v-text="$t('labels.address')" />
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
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="openDialog">
                <v-icon small>{{ mdiQrcode }}</v-icon>
              </v-btn>
            </template>
            <span v-text="$t('msgs.scan')" />
          </v-tooltip>
          <account-modal-QR-code v-model="dialog" :address="address" />
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
import AccountIdentityMembership from './AccountIdentityMembership.vue';
import AccountModalQRCode from './AccountModalQRCode.vue';

import { mdiCheckAll, mdiContentCopy, mdiQrcode } from '@mdi/js';

export default {
  name: 'AccountIdentity',
  components: {
    AccountIdentityMembership,
    AccountModalQRCode,
  },
  data() {
    return {
      mdiCheckAll,
      mdiContentCopy,
      mdiQrcode,
      copied: false,
      dialog: false,
    };
  },
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
