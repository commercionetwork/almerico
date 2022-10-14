<template>
  <div>
    <v-btn
      v-if="isInitialized"
      outlined
      v-bind="size"
      @click="disconnectWallet"
    >
      <span v-text="address" />
    </v-btn>
    <v-btn
      v-else
      :disabled="isLoading"
      outlined
      v-bind="size"
      @click="connectWallet"
    >
      <span>{{ $t('labels.connectWallet') }}</span>
      <v-icon right v-bind="size">{{ mdiWalletOutline }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="info--text" v-text="$t('labels.info')" />
          <v-icon color="info" right>{{ mdiInformationOutline }}</v-icon>
          <v-spacer />
          <v-toolbar-items>
            <v-btn icon color="grey" dark @click="closeDialog">
              <v-icon>{{ mdiClose }}</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-alert border="left" colored-border color="info">
            <div class="py-3 text-body-1" v-html="dialogMessage" />
          </v-alert>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiClose, mdiInformationOutline, mdiWalletOutline } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TheConnectWalletButton',
  data() {
    return {
      mdiClose,
      mdiInformationOutline,
      mdiWalletOutline,
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('keplr', [
      'error',
      'isLoading',
      'isInitialized',
      'hasKeplr',
      'accounts',
    ]),
    address() {
      if (!this.accounts.length) return '';
      const address = this.accounts[0].address;
      return `${address.slice(0, 14)}...${address.slice(44, 47)}`;
    },
    size() {
      const size = { xs: 'x-small', sm: 'small' }[
        this.$vuetify.breakpoint.name
      ];
      return size ? { [size]: true } : {};
    },
    dialogMessage() {
      const link = `<a href="https://www.keplr.app/">www.keplr.app</a>`;
      return this.hasKeplr ? this.error : `${this.error}. ${link}`;
    },
  },
  watch: {
    error(value) {
      if (value) this.dialog = true;
    },
  },
  methods: {
    ...mapActions('keplr', ['connect', 'disconnect', 'resetError']),
    closeDialog() {
      this.resetError();
      this.dialog = false;
    },
    connectWallet() {
      this.connect({ translator: this.$t, context: this });
    },
    disconnectWallet() {
      this.disconnect();
    },
  },
};
</script>
