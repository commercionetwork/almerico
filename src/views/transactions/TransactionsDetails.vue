<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.transactionDetails')" />
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div v-else>
        <TransactionsDetailsInfo :transaction="transaction" />
        <div class="my-3 p-1 rounded-lg bg-light">
          <div class="row p-1">
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
          >
            <component
              v-bind:is="msgComponent"
              :message="message"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MsgTxCreateValidator from "./msgs/MsgTxCreateValidator.vue";
import MsgTxEditValidator from "./msgs/MsgTxEditValidator.vue";
import MsgTxDefault from "./msgs/MsgTxDefault.vue";
import MsgTxSend from "./msgs/MsgTxSend.vue";
import MsgTxUndelegate from "./msgs/MsgTxUndelegate.vue";
import MsgTxUnjail from "./msgs/MsgTxUnjail.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import TransactionsDetailsInfo from "./TransactionsDetailsInfo.vue";

import api from "Store/transactions/api";
import { TX_TYPES } from "Constants";

export default {
  name: "TransactionsDetails",
  description: "Display the transaction details",
  components: {
    MsgTxCreateValidator,
    MsgTxEditValidator,
    MsgTxDefault,
    MsgTxSend,
    MsgTxUndelegate,
    MsgTxUnjail,
    SectionHeader,
    TransactionsDetailsInfo
  },
  data() {
    return {
      TX_TYPES,
      isFetching: false,
      messages: [],
      transaction: null
    };
  },
  computed: {
    msgComponent() {
      let component = null;
      switch (this.type) {
        case TX_TYPES.BEGIN_UNBONDING:
          component = MsgTxUndelegate;
          break;
        case TX_TYPES.CREATE_VALIDATOR:
          component = MsgTxCreateValidator;
          break;
        case TX_TYPES.EDIT_VALIDATOR:
          component = MsgTxEditValidator;
          break;
        case TX_TYPES.SEND:
          component = MsgTxSend;
          break;
        case TX_TYPES.UNJAIL:
          component = MsgTxUnjail;
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
        console.log(error);
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
