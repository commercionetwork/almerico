<template>
  <div class="container com-container">
    <div class="row">
      <div class="col-12">
        <SectionHeader :title="$t('titles.transactionDetails')" />
      </div>
    </div>
    <div
      v-if="isFetching"
      class="com-font-s14-w400"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && hasError"
      class="text-center text-danger com-font-s14-w400"
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded bg-light"
      data-test="item"
    >
      <div class="col-12 p-0">
        <div class="row">
          <div class="col-12">
            <TransactionsDetailsInfo :transaction="transaction" />
          </div>
        </div>
        <div class="py-3 px-5 rounded bg-white">
          <div class="row py-1">
            <div class="col-12">
              <h2
                class="com-font-s16-w700"
                v-text="$t('titles.messages')"
              />
            </div>
          </div>
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="row py-1"
          >
            <div class="col-12">
              <component
                v-bind:is="msgComponent"
                :message="message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsgTxCreateAccount from "./msgs/MsgTxCreateAccount.vue";
import MsgTxCreateConnection from "./msgs/MsgTxCreateConnection.vue";
import MsgTxCreateValidator from "./msgs/MsgTxCreateValidator.vue";
import MsgTxDefault from "./msgs/MsgTxDefault.vue";
import MsgTxDelegate from "./msgs/MsgTxDelegate.vue";
import MsgTxEditValidator from "./msgs/MsgTxEditValidator.vue";
import MsgTxRedelegate from "./msgs/MsgTxRedelegate.vue";
import MsgTxSend from "./msgs/MsgTxSend.vue";
import MsgTxSetIdentity from "./msgs/MsgTxSetIdentity.vue";
import MsgTxShareDocument from "./msgs/MsgTxShareDocument.vue";
import MsgTxStoreDocument from "./msgs/MsgTxStoreDocument.vue";
import MsgTxUnbonding from "./msgs/MsgTxUnbonding.vue";
import MsgTxUnjail from "./msgs/MsgTxUnjail.vue";
import MsgTxWithdrawDelegatorReward from "./msgs/MsgTxWithdrawDelegatorReward.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import TransactionsDetailsInfo from "./TransactionsDetailsInfo.vue";

import api from "Store/transactions/api";
import { TX_TYPES } from "Constants";

export default {
  name: "TransactionDetails",
  description: "Display the transaction details",
  components: {
    MsgTxCreateAccount,
    MsgTxCreateConnection,
    MsgTxCreateValidator,
    MsgTxDelegate,
    MsgTxEditValidator,
    MsgTxDefault,
    MsgTxRedelegate,
    MsgTxSend,
    MsgTxSetIdentity,
    MsgTxShareDocument,
    MsgTxStoreDocument,
    MsgTxUnbonding,
    MsgTxUnjail,
    MsgTxWithdrawDelegatorReward,
    SectionHeader,
    TransactionsDetailsInfo
  },
  data() {
    return {
      TX_TYPES,
      hasError: false,
      isFetching: false,
      messages: [],
      transaction: {}
    };
  },
  computed: {
    msgComponent() {
      let component = null;
      switch (this.type) {
        case TX_TYPES.CREATE_ACCOUNT:
          component = MsgTxCreateAccount;
          break;
        case TX_TYPES.CREATE_CONNECTION:
          component = MsgTxCreateConnection;
          break;
        case TX_TYPES.CREATE_VALIDATOR:
          component = MsgTxCreateValidator;
          break;
        case TX_TYPES.DELEGATE:
          component = MsgTxDelegate;
          break;
        case TX_TYPES.EDIT_VALIDATOR:
          component = MsgTxEditValidator;
          break;
        case TX_TYPES.REDELEGATE:
          component = MsgTxRedelegate;
          break;
        case TX_TYPES.SEND:
          component = MsgTxSend;
          break;
        case TX_TYPES.SET_IDENTITY:
          component = MsgTxSetIdentity;
          break;
        case TX_TYPES.SHARE_DOCUMENT:
          component = MsgTxShareDocument;
          break;
        case TX_TYPES.STORE_DOCUMENT:
          component = MsgTxStoreDocument;
          break;
        case TX_TYPES.UNBONDING:
          component = MsgTxUnbonding;
          break;
        case TX_TYPES.UNJAIL:
          component = MsgTxUnjail;
          break;
        case TX_TYPES.WITHDRAW_DELEGATOR_REWARD:
          component = MsgTxWithdrawDelegatorReward;
          break;
        default:
          component = MsgTxDefault;
          break;
      }
      return component;
    },
    type() {
      return this.transaction.tags.find(tag => tag.key === "action").value;
    }
  },
  methods: {
    async getTransaction(hash) {
      this.isFetching = true;
      try {
        const response = await api.requestTransactionByHash(hash);
        this.transaction = response.data;
        this.messages = this.transaction.tx.value.msg;
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getTransaction(this.$route.params.id);
  }
};
</script>
