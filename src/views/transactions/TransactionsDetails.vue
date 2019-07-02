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
          <div v-if="type === TX_TYPES.SEND">
            <MsgTxSend
              v-for="(message, index) in messages"
              :key="index"
              :message="message"
            />
          </div>
          <div v-else-if="type === TX_TYPES.BEGIN_UNBONDING">
            <MsgTxUndelegate
              v-for="(message, index) in messages"
              :key="index"
              :message="message"
            />
          </div>
          <div v-else-if="type === TX_TYPES.UNJAIL">
            <MsgTxUnjail
              v-for="(message, index) in messages"
              :key="index"
              :message="message"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    type() {
      return this.transaction.tags[0].value;
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
