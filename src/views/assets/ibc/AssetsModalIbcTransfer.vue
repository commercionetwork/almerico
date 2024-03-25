<template>
  <v-dialog max-width="800" transition="dialog-transition" v-model="dialog">
    <v-card flat :loading="isLoading">
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
          <assets-modal-ibc-transfer-select
            :items="connections"
            v-model="chain"
          />
          <assets-modal-ibc-transfer-amount
            :maxBalance="maxBalance"
            :v="$v.model.amount"
            v-model.trim="model.amount"
          />
          <assets-modal-ibc-transfer-execute
            :amount="model.amount"
            :chain="chain"
            :disabled="$v.$invalid"
            :isDeposit="isDeposit"
            :label="title"
            :token="token"
          />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AssetsModalIbcTransferAmount from './AssetsModalIbcTransferAmount.vue';
import AssetsModalIbcTransferExecute from './AssetsModalIbcTransferExecute.vue';
import AssetsModalIbcTransferSelect from './AssetsModalIbcTransferSelect.vue';

import { mdiClose } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { CONFIG, TRANSFER } from '@/constants';
import { tokensHandler } from '@/utils';
import assetsTransferManager from '../helpers/assetsTransferManager';

export default {
  name: 'AssetsModalIbcTransfer',
  components: {
    AssetsModalIbcTransferAmount,
    AssetsModalIbcTransferExecute,
    AssetsModalIbcTransferSelect,
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
      chain: null,
      dialog: false,
      model: {
        amount: '0',
      },
    };
  },
  computed: {
    ...mapGetters('assetsIbc', ['isLoading', 'isHandling', 'modal']),
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
      return this.modal ? this.modal.token : null;
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
    chain(value) {
      if (value) {
        this.initIBCTransfer(value);
      }
    },
    modal(value) {
      this.model.amount = '0';
      this.dialog = !!value;
    },
  },
  // created() {
  //   this.chain = this.connections[0];
  // },
  methods: {
    ...mapActions('assetsIbc', ['handleModal', 'initIBCTransfer']),
    close() {
      this.handleModal(null);
      this.chain = null;
    },
  },
};
</script>
