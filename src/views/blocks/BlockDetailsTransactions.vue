<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2
          v-text="$t('titles.transactions')"
          class="com-font-s16-w700"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th scope="col">
                  <span v-text="$t('labels.hash')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.type')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.result')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.amount')" />
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
              <BlockDetailsTransactionsRow
                v-for="(transaction, index) in transactions"
                :key="index"
                :transaction="transaction"
              />
            </tbody>
          </table>
        </div>
      </div>
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
