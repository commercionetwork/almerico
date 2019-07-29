<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.transactionDetails')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
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
            <TransactionDetailsInfo :transaction="transaction" />
          </div>
        </div>
        <div
          v-if="$config.transaction_details.msgs_details"
          class="py-3 px-5 rounded bg-white"
          data-test="msgs-details"
        >
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
                v-bind:is="getComponentName(message)"
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
import Config from "Assets/json/config.json";

import MsgDefault from "./msgs/MsgDefault.vue";
import SearchBar from "Components/common/SearchBar.vue";
import TransactionDetailsInfo from "./TransactionDetailsInfo.vue";

import api from "Store/transactions/api";

let supportedTypes = Config.transactions.supported_types;
let components = {};
supportedTypes.forEach(component => {
  components[component.name] = () => import(`./msgs/${component.name}.vue`);
});

export default {
  name: "TransactionDetails",
  description: "Display the transaction details",
  components: {
    ...components,
    MsgDefault,
    SearchBar,
    TransactionDetailsInfo
  },
  data() {
    return {
      hasError: false,
      isFetching: false,
      messages: [],
      transaction: {},
      model: {
        components: supportedTypes
      }
    };
  },
  computed: {
    txId() {
      return this.$route.params.id;
    }
  },
  watch: {
    txId(value) {
      this.getTransaction(value);
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
    },
    getComponentName(message) {
      let component = this.model.components.find(
        component => component.type === message.type
      );
      return component ? component.name : MsgDefault.name;
    }
  },
  created() {
    this.getTransaction(this.txId);
  }
};
</script>
