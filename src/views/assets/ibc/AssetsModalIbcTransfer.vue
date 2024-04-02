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
      <v-card-text v-if="txHash">
        <assets-modal-ibc-transfer-result :hash="txHash" />
      </v-card-text>
      <v-card-text v-else>
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
            @success="onSuccess"
          />
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import AssetsModalIbcTransferAmount from './AssetsModalIbcTransferAmount.vue';
import AssetsModalIbcTransferExecute from './AssetsModalIbcTransferExecute.vue';
import AssetsModalIbcTransferResult from './AssetsModalIbcTransferResult.vue';
import AssetsModalIbcTransferSelect from './AssetsModalIbcTransferSelect.vue';

import { mdiClose } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { CONFIG, TRANSFER } from '@/constants';
import { tokensHandler } from '@/utils';
import assetsTransferHelper from '../helpers/assetsTransferHelper';

export default {
  name: 'AssetsModalIbcTransfer',
  components: {
    AssetsModalIbcTransferAmount,
    AssetsModalIbcTransferExecute,
    AssetsModalIbcTransferResult,
    AssetsModalIbcTransferSelect,
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        amount: {
          greaterThanZero: (value) =>
            assetsTransferHelper.greaterThanZero(value),
          smallerThanBalance: (value) =>
            assetsTransferHelper.smallerThanBalance({
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
      txHash: '',
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
    counterpartyBalance() {
      return this.modal && this.modal.counterparty_balance
        ? this.modal.counterparty_balance.amount
        : '0';
    },
    maxBalance() {
      if (!this.token) {
        return '0';
      }
      return this.isDeposit
        ? tokensHandler
            .convertFromBase(this.counterpartyBalance, this.token.decimals)
            .toString()
        : tokensHandler
            .convertFromBase(this.balance, this.token.decimals)
            .toString();
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
        this.initIBCTransfer({
          chain: value,
          translator: this.$t,
          context: this,
        });
      }
    },
    modal(value) {
      this.model.amount = '0';
      this.dialog = !!value;
    },
  },
  methods: {
    ...mapActions('assetsIbc', ['handleModal', 'initIBCTransfer']),
    close() {
      this.handleModal(null);
      this.chain = null;
      this.txHash = '';
    },
    onSuccess(res) {
      this.txHash = res.transactionHash;
    },
  },
};
</script>
