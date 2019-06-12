<template>
  <div class="my-3 p-1 rounded-lg bg-light border">
    <div class="row p-1">
      <div class="col-12">
        <h2 class="com-font-s16-w700">Transactions</h2>
      </div>
    </div>
    <div
      v-if="transactions.length > 0"
      class="table-responsive"
    >
      <table class="table table-striped">
        <thead>
          <tr class="text-center com-font-s12-w700">
            <th scope="col">TxHash</th>
            <th scope="col">Type</th>
            <th scope="col">Result</th>
            <th scope="col">Fee</th>
            <th scope="col">Height</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          <BlockDetailsTransactionsRow
            v-for="transaction in transactions"
            :key="transaction.txhash"
            :transaction="transaction"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BlockDetailsTransactionsRow from "./BlockDetailsTransactionsRow.vue";

export default {
  name: "BlockDetailsTransactions",
  description: "Display the block's transactions",
  components: {
    BlockDetailsTransactionsRow
  },
  props: {
    transactions: {
      type: Array,
      required: true,
      description: "The transactions to display"
    }
  }
};
</script>
