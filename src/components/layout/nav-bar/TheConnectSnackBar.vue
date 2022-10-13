<template>
  <v-snackbar
    color="red darken-4"
    transition="slide-y-transition"
    :timeout="timeout"
    v-model="snackbar"
  >
    <span class="white--text font-weight-bold" v-text="snackbarMessage" />
    <template v-slot:action="{ attrs }">
      <v-btn icon color="white" v-bind="attrs" @click="snackbar = false">
        <v-icon>{{ mdiClose }}</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mdiClose } from '@mdi/js';
import { mapGetters } from 'vuex';

export default {
  name: 'TheConnectSnackBar',
  data() {
    return {
      mdiClose,
      snackbar: false,
      timeout: 2000,
    };
  },
  computed: {
    ...mapGetters('keplr', ['accounts']),
    address() {
      if (!this.accounts.length) return '';
      const address = this.accounts[0].address;
      return `${address.slice(0, 14)}...${address.slice(44, 47)}`;
    },
    snackbarMessage() {
      return !this.address
        ? this.$t('msgs.noWalletConnected')
        : `${this.address} ${this.$t('msgs.connected')}`;
    },
  },

  watch: {
    accounts(value) {
      if (value) this.snackbar = true;
    },
  },
};
</script>
