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
                v-bind:is="getComponent(message).name"
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
import Data from "Assets/json/setup.json";
let supportedTypes = Data.transactions.supported_types;
let components = {};
supportedTypes.forEach(component => {
  components[component.name] = () => import(`./msgs/${component.name}.vue`);
});

import MsgTxDefault from "./msgs/MsgTxDefault.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import TransactionsDetailsInfo from "./TransactionsDetailsInfo.vue";

import api from "Store/transactions/api";

export default {
  name: "TransactionDetails",
  description: "Display the transaction details",
  components: {
    ...components,
    MsgTxDefault,
    SectionHeader,
    TransactionsDetailsInfo
  },
  data() {
    return {
      hasError: false,
      isFetching: false,
      messages: [],
      transaction: {},
      data: {
        components: supportedTypes
      }
    };
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
    },
    getComponent(message) {
      let component = this.data.components.find(
        component => component.type === message.type
      );
      return component ? component : MsgTxDefault;
    }
  },
  created() {
    this.getTransaction(this.$route.params.id);
  }
};
</script>
