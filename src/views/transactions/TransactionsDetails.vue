<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.transactionDetails')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.lodaing')"
      />
      <div v-else>
        <TransactionsDetailsInfo :transaction="transaction" />
      </div>

      <div class="my-3 p-1 rounded-lg bg-light border">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Msgs</h2>
          </div>
        </div>
        <div class="p-1 rounded bg-white border">
          <div class="row p-1">
            <div class="col-12">
              <h3 class="com-font-s16-w700">Send</h3>
            </div>
          </div>
          <hr>
          <div class="row p-1">
            <div class="col-12 col-md-3 com-font-s13-w700">From</div>
            <div class="col-12 col-md-9 text-break com-font-s13-w400">com12wdcfr34ewsdf</div>
          </div>
          <div class="row p-1">
            <div class="col-12 col-md-3 com-font-s13-w700">To</div>
            <div class="col-12 col-md-9 text-break com-font-s13-w400">comfr543dgh678kj</div>
          </div>
          <div class="row p-1">
            <div class="col-12 col-md-3 com-font-s13-w700">Amount</div>
            <div class="col-12 col-md-9 text-break com-font-s13-w400">1000 COMM</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TransactionsDetailsInfo from "./TransactionsDetailsInfo.vue";

import api from "Store/tendermint/api";

export default {
  name: "TransactionsDetails",
  description: "Display the transaction details",
  components: {
    SectionHeader,
    TransactionsDetailsInfo
  },
  data() {
    return {
      isFetching: false,
      transaction: null
    };
  },
  computed: {
    price() {
      return { value: 1, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  },
  methods: {
    async getTransaction(hash) {
      this.isFetching = true;
      try {
        const response = await api.requestTransactionByHash(hash);
        this.transaction = response.data;
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
