<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th scope="col">
            <span v-text="$t('labels.delegator')" />
          </th>
          <th scope="col">
            <span v-text="$t('labels.amount')" />
          </th>
          <th scope="col">
            <span v-text="$t('labels.share')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <ValidatorDetailsDelegatorsTableRow
          v-for="(delegator, index) in delegators"
          :key="index"
          :delegator="delegator"
          :totalShares="totalShares"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ValidatorDetailsDelegatorsTableRow from "./ValidatorDetailsDelegatorsTableRow.vue";

export default {
  name: "ValidatorDetailsDelegatorsTable",
  description: "Display the delegators table of a validator",
  components: {
    ValidatorDetailsDelegatorsTableRow
  },
  props: {
    delegators: {
      type: Array,
      required: true,
      note: "The delegators list to display"
    },
    totalShares: {
      type: Number,
      required: true,
      note: "All delegated tokens of a validator"
    }
  }
};
</script>
