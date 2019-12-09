<template>
  <div class="table-responsive">
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
        <AccountTransactionsTableRow
          v-for="(transaction,index) in transactions"
          :key="index"
          :transaction="transaction"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import AccountTransactionsTableRow from "./AccountTransactionsTableRow.vue";

export default {
  name: "AccountTransactionsTable",
  description: "Display the transactions table of an account",
  components: {
    AccountTransactionsTableRow
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
