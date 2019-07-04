<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1 d-flex align-items-center">
        <div class="col-12">
          <h2
            class="com-font-s16-w700"
            v-text="'Transactions'"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th scope="col">TxHash</th>
                  <th scope="col">Height</th>
                  <th scope="col">Type</th>
                  <th scope="col">Result</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <AccountTransactionsRow
                  v-for="(transaction,index) in transactions"
                  :key="index"
                  :transaction="transaction"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import AccountTransactionsRow from "./AccountTransactionsRow.vue";

import api from "Store/transactions/api";
import { ACCOUNT_ROLES, VALIDATOR_ROLES } from "Constants";
import { arrayManager } from "Utils";

export default {
  name: "AccountTransactions",
  description: "Display the account transactions list",
  components: {
    AccountTransactionsRow
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account address"
    },
    validatorAddress: {
      type: String,
      required: true,
      note: "The validator address"
    }
  },
  data() {
    return {
      isFetching: false,
      allTransactions: []
    };
  },
  computed: {
    transactions() {
      const transactions = arrayManager.uniqueByKey(this.allTransactions, JSON.stringify);
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
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
        Object.values(VALIDATOR_ROLES).forEach(role => {
          this.getTxs(role, this.validatorAddress);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getData();
  }
};
</script>
