<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          class="py-3 com-font-s16-w700"
          v-text="$t('titles.transactions')"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="transactions.length > 0"
          :limit="limit"
          :page="page"
          :total="total"
          v-on:change-page="changePage"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
          v-else-if="!isFetching && !hasError && transactions.length > 0"
          class="table-responsive"
          data-test="items"
        >
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th scope="col">
                  <span v-text="$t('labels.hash')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.height')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.type')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.result')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.fee')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.date')" />
                </th>
              </tr>
            </thead>
            <tbody>
              <AccountTransactionsRow
                v-for="(transaction,index) in transactionsPage"
                :key="index"
                :transaction="transaction"
              />
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="text-center text-info com-font-s14-w700"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AccountTransactionsRow from "./AccountTransactionsRow.vue";
import Pagination from "Components/common/Pagination.vue";

import api from "Store/transactions/api";
import { ACCOUNT_ROLES } from "Constants";
import { arrayManager } from "Utils";

export default {
  name: "AccountTransactions",
  description: "Display the account transactions list",
  components: {
    AccountTransactionsRow,
    Pagination
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account address"
    }
  },
  data() {
    return {
      allTransactions: [],
      hasErrorData: false,
      hasErrorTxs: false,
      isFetching: false,
      limit: 5,
      page: 1
    };
  },
  computed: {
    hasError() {
      return this.hasErrorData || this.hasErrorTxs;
    },
    transactionsPage() {
      return this.transactions.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
    transactions() {
      const transactions = arrayManager.uniqueByKey(
        this.allTransactions,
        JSON.stringify
      );
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
    },
    total() {
      return this.transactions.length;
    }
  },
  methods: {
    async getTxs(role, address) {
      try {
        const response = await api.requestTransactions({
          tag: `${role}=${address}`
        });
        if (response.data) this.allTransactions.push(...response.data);
      } catch (error) {
        this.hasErrorTxs = true;
      }
    },
    getData() {
      this.isFetching = true;
      try {
        Object.values(ACCOUNT_ROLES).forEach(role => {
          this.getTxs(role, this.address);
        });
      } catch (error) {
        this.hasErrorData = true;
      } finally {
        this.isFetching = false;
      }
    },
    changePage(page) {
      this.page = page;
    }
  },
  created() {
    this.getData();
  }
};
</script>
