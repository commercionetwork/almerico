<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.transactions')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div
      v-if="$config.transactions.live_data.enabled"
      class="row my-1"
      data-test="live-data"
    >
      <div class="col-12">
        <SectionHeader
          :bondedEnabled="$config.transactions.live_data.bonded"
          :heightEnabled="$config.transactions.live_data.height"
          :priceEnabled="$config.transactions.live_data.price"
        />
      </div>
    </div>
    <div class="row rounded com-bg-body">
      <div class="col-12">
        <div class="row py-1 px-5">
          <div class="col-12 col-md-5 py-1">
            <select
              class="custom-select"
              v-model="selectedType"
            >
              <option
                disabled
                v-text="$t('messages.selectType')"
                :value="null"
              />
              <option
                v-text="$t('messages.all')"
                :value="null"
              />
              <option
                v-for="(type, index) in $config.transactions.supported_types"
                :key="index"
                v-text="type.name"
                :value="type.tag"
              />
            </select>
          </div>
          <div class="col-12 col-md-2 py-1">
            <select
              class="custom-select"
              v-model="limit"
            >
              <option
                disabled
                v-text="$t('messages.selectLimit')"
                :value="null"
              />
              <option
                v-for="(limit, index) in LIMITS_LIST.VALUES"
                :key="index"
                v-text="limit"
                :value="limit"
              />
            </select>
          </div>
          <div class="col-12 col-md-5 py-1">
            <Pagination
              v-if="total > 0"
              :limit="limit"
              :page="page"
              :total="total"
              v-on:change-page="changePage"
              data-test="pagination"
            />
          </div>
        </div>
        <div class="row pt-0 pb-1 px-5">
          <div class="col-12">
            <div
              v-if="isFetching"
              class="alert alert-warning"
              role="alert"
              v-text="$t('messages.loading')"
              data-test="loading"
            />
            <div
              v-else-if="!isFetching && hasError"
              class="alert alert-danger"
              role="alert"
              v-text="$t('messages.fetchingError')"
              data-test="has-error"
            />
            <TableTransactions
              v-else-if="!isFetching && !hasError && transactionsPage.length > 0"
              :transactions="transactionsPage"
              data-test="items"
            />
            <div
              v-else
              class="alert alert-info"
              role="alert"
              v-text="$t('messages.noItems')"
              data-test="no-items"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import SearchBar from "Components/common/SearchBar.vue";
import TableTransactions from "./TableTransactions.vue";

import { LIMITS_LIST } from "Constants";
import { arrayManager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "Transactions",
  description: "Container for transactions' section",
  components: {
    Pagination,
    SectionHeader,
    SearchBar,
    TableTransactions
  },
  data() {
    return {
      LIMITS_LIST,
      limit: LIMITS_LIST.DEFAULT,
      page: 1,
      selectedType: null
    };
  },
  computed: {
    ...mapGetters("transactions", {
      isFetching: "isFetching",
      message: "message",
      transactions: "transactions"
    }),
    hasError() {
      return this.message ? true : false;
    },
    transactionsPage() {
      return this.orderedTransactions.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
    orderedTransactions() {
      let transactions = arrayManager.uniqueValuesArrayFromObjectsArray(
        this.transactions
      );
      if (this.selectedType) {
        const txs = transactions.filter(tx => {
          let message = tx.events.find(event => event.type === "message");
          return message.attributes.find(
            attribute => attribute.value === this.selectedType
          );
        });
        transactions = txs;
      }
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
    },
    total() {
      return this.orderedTransactions.length;
    }
  },
  watch: {
    limit() {
      this.page = 1;
    },
    selectedType() {
      this.page = 1;
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
