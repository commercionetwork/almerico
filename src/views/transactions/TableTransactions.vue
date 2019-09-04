<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th
            v-if="$config.transactions.table.columns.hash"
            scope="col"
            data-test="table-column-hash"
          >
            <span v-text="$t('labels.hash')" />
          </th>
          <th
            v-if="$config.transactions.table.columns.type"
            scope="col"
            data-test="table-column-type"
          >
            <span v-text="$t('labels.type')" />
          </th>
          <th
            v-if="$config.transactions.table.columns.result"
            scope="col"
            data-test="table-column-result"
          >
            <span v-text="$t('labels.result')" />
          </th>
          <th
            v-if="$config.transactions.table.columns.amount"
            scope="col"
            data-test="table-column-amount"
          >
            <span v-text="$t('labels.amount')" />
          </th>
          <th
            v-if="$config.transactions.table.columns.fee"
            scope="col"
            data-test="table-column-fee"
          >
            <span v-text="$t('labels.fee')" />
          </th>
          <th
            v-if="$config.transactions.table.columns.block_height"
            scope="col"
            data-test="table-column-height"
          >
            <span v-text="$t('labels.height')" />
          </th>
          <th
            v-if="$config.transactions.table.columns.date"
            scope="col"
            data-test="table-column-date"
          >
            <span v-text="$t('labels.date')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <TableTransactionsRow
          v-for="(transaction, index) in transactions"
          :key="index"
          :transaction="transaction"
          data-test="items"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import TableTransactionsRow from "./TableTransactionsRow.vue";

export default {
  name: "TableTransactions",
  description: "Display the transactions table",
  components: {
    TableTransactionsRow
  },
  props: {
    transactions: {
      type: Array,
      required: true,
      note: "The transactions list to display"
    }
  }
};
</script>
