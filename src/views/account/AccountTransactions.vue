<template>
  <div>
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row align-items-center">
        <div class="col-12 col-md-4">
          <h2
            class="com-font-s16-w700"
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
            v-if="transactions.length > 0"
            class="table-responsive"
          >
            <table class="table table-striped">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th
                    scope="col"
                    v-text="$t('labels.hash')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.height')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.type')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.result')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.fee')"
                  />
                  <th
                    scope="col"
                    v-text="$t('labels.date')"
                  />
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
            class="text-center com-font-s13-w700"
            v-text="$t('messages.noItems')"
          />
        </div>
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
      isFetching: false,
      allTransactions: [],
      limit: 5,
      page: 1
    };
  },
  computed: {
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
        console.log(error);
      }
    },
    getData() {
      this.isFetching = true;
      try {
        Object.values(ACCOUNT_ROLES).forEach(role => {
          this.getTxs(role, this.address);
        });
      } catch (error) {
        console.log(error);
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
