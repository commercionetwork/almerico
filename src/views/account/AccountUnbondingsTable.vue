<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th scope="col">
            <span v-text="$t('labels.validator')" />
          </th>
          <th scope="col">
            <span v-text="$t('labels.height')" />
          </th>
          <th scope="col">
            <span v-text="$t('labels.amount')" />
          </th>
          <th scope="col">
            <span v-text="$t('labels.finalDate')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <AccountUnbondingsTableRow
          v-for="(unbonding, index) in unbondings"
          :key="index"
          :unbonding="unbonding"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import AccountUnbondingsTableRow from "./AccountUnbondingsTableRow.vue";
export default {
  name: "AccountUnbondingsTable",
  description: "Display the unbondings table of an account",
  components: {
    AccountUnbondingsTableRow
  },
  props: {
    unbondings: {
      type: Array,
      required: true,
      note: "The unbondings list to display"
    }
  }
};
</script>
