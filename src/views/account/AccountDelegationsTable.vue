<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th scope="col">
            <span v-text="$t('labels.validator')" />
          </th>
          <th scope="col">
            <span v-text="$t('labels.amount')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <AccountDelegationsTableRow
          v-for="(delegation, index) in delegations"
          :key="index"
          :delegation="delegation"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import AccountDelegationsTableRow from "./AccountDelegationsTableRow.vue";

export default {
  name: "AccountDelegationsTable",
  description: "Display the delegations table of an account",
  components: {
    AccountDelegationsTableRow
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "The delegations list to display"
    }
  }
};
</script>
