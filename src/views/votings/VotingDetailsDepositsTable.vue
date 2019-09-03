<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th
            scope="col"
            data-test="table-column-height"
          >
            <span v-text="$t('labels.depositor')" />
          </th>
          <th
            scope="col"
            data-test="table-column-hash"
          >
            <span v-text="$t('labels.amount')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <VotingDetailsDepositsTableRow
          v-for="(deposit, index) in deposits"
          :key="index"
          :deposit="deposit"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import VotingDetailsDepositsTableRow from "./VotingDetailsDepositsTableRow.vue";

export default {
  name: "VotingDetailsDepositsTable",
  description: "Display the deposits table of a voting",
  components: {
    VotingDetailsDepositsTableRow
  },
  props: {
    deposits: {
      type: Array,
      required: true,
      note: "The deposits list to display"
    }
  }
};
</script>