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
          <div class="col-12 col-md-6 py-1">
            <select
              class="custom-select"
              v-model="selectedType"
            >
              <option
                disabled
                :value="null"
                v-text="$t('messages.selectType')"
              />
              <option
                v-for="(type, index) in $config.transactions.supported_types"
                :key="index"
                v-text="type.name"
                :value="type.tag"
              />
            </select>
          </div>
          <div class="col-12 col-md-6 py-1">
            <Pagination
              v-if="transactions.length > 0"
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
              class="text-info com-font-s14-w400"
              v-text="$t('messages.loading')"
              data-test="loading"
            />
            <div
              v-else-if="!isFetching && hasError"
              class="text-danger com-font-s14-w400"
              v-text="$t('messages.fetchingError')"
              data-test="has-error"
            />
            <TableTransactions
              v-else-if="!isFetching && !hasError && transactions.length > 0"
              :transactions="transactions"
              data-test="items"
            />
            <div
              v-else
              class="py-1 text-center text-info border-top com-font-s14-w700"
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

import api from "Store/transactions/api";

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
      hasError: false,
      isFetching: false,
      limit: 20,
      page: 1,
      total: 0,
      selectedType: null,
      transactions: []
    };
  },
  watch: {
    selectedType() {
      this.page = 1;
      this.getTransactions(1);
    }
  },
  methods: {
    async fetchTransactions(type, page) {
      try {
        const response = await api.requestTransactions({
          tag: `message.action=${type}`,
          page,
          limit: this.limit
        });
        return response;
      } catch (error) {
        this.hasError = true;
      }
    },
    async getTransactions(page) {
      this.isFetching = true;
      try {
        const response = await this.fetchTransactions(
          this.selectedType,
          page
        );
        this.total = response.data.total_count;
        this.transactions = response.data.txs;
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
    },
    changePage(page) {
      this.page = page;
      this.getTransactions(page);
    }
  }
};
</script>
