<template>
  <v-dialog max-width="800" transition="dialog-transition" v-model="dialog">
    <v-card flat :loading="isFetching">
      <v-toolbar class="mb-3" flat>
        <v-toolbar-title class="primary--text">
          <span v-text="title" />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon @click="close">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <assets-modal-transfer-select
          :items="connections"
          v-model="connection"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AssetsModalTransferSelect from './AssetsModalTransferSelect.vue';

import { mdiClose } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';
import { CONFIG, TRANSFER } from '@/constants';

export default {
  name: 'AssetsModalTransfer',
  components: {
    AssetsModalTransferSelect,
  },
  data() {
    return {
      mdiClose,
      connection: null,
      dialog: false,
      model: {
        amount: '0.01',
      },
    };
  },
  computed: {
    ...mapGetters('assets', ['isFetching', 'modal']),
    ...mapGetters('keplr', ['wallet']),
    connections() {
      return CONFIG.CONNECTIONS;
    },
    isDeposit() {
      return this.modal ? this.modal.type === TRANSFER.TYPE.DEPOSIT : false;
    },
    token() {
      return this.modal ? JSON.parse(this.modal.token) : null;
    },
    title() {
      if (!this.modal) {
        return '';
      }
      return this.isDeposit
        ? `${this.$t('titles.deposit')} ${this.token.name}`
        : `${this.$t('titles.withdraw')} ${this.token.name}`;
    },
  },
  watch: {
    connection(value) {
      let wallet, token;
      if (this.isDeposit) {
        wallet = this.wallet;
        token = this.token;
      }
      this.initIBCTransfer({ connection: value, wallet, token });
    },
    modal(value) {
      this.dialog = !!value;
    },
  },
  created() {
    if (this.connections.length > 0) {
      this.connection = this.connections[0];
    }
  },
  methods: {
    ...mapActions('assets', ['handleModal', 'initIBCTransfer']),
    close() {
      this.handleModal(null);
    },
  },
};
</script>
