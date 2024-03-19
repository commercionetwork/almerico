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
        <v-form :disabled="isHandling">
          <assets-modal-transfer-select
            :items="connections"
            v-model="connection"
          />
          <assets-modal-transfer-amount
            :maxBalance="maxBalance"
            v-model.trim="model.amount"
          />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AssetsModalTransferAmount from './AssetsModalTransferAmount.vue';
import AssetsModalTransferSelect from './AssetsModalTransferSelect.vue';

import { mdiClose } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { CONFIG, TRANSFER } from '@/constants';
import { tokensHandler } from '@/utils';
import assetsTransferManager from '../helpers/assetsTransferManager';

export default {
  name: 'AssetsModalTransfer',
  components: {
    AssetsModalTransferAmount,
    AssetsModalTransferSelect,
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        amount: {
          greaterThanZero: (value) =>
            assetsTransferManager.greaterThanZero(value),
          smallerThanBalance: (value) =>
            assetsTransferManager.smallerThanBalance({
              amount: value,
              balance: this.maxBalance,
            }),
        },
      },
    };
  },
  data() {
    return {
      mdiClose,
      connection: null,
      dialog: false,
      model: {
        amount: '0',
      },
    };
  },
  computed: {
    ...mapGetters('assets', ['isFetching', 'isHandling', 'modal']),
    ...mapGetters('keplr', ['wallet']),
    balance() {
      return this.token ? this.token.balance : '0';
    },
    maxBalance() {
      return this.token
        ? tokensHandler.convertFromBase(this.balance, this.token.decimals) + ''
        : '0';
    },
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
        token = this.token;
        wallet = this.wallet;
      }
      this.initIBCTransfer({ connection: value, token, wallet });
    },
    modal(value) {
      this.model.amount = '0';
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
