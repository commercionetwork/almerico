<template>
  <table class="table table-striped">
    <thead>
      <tr class="text-center com-font-s13-w700">
        <th
          scope="col"
          v-text="$t('labels.rank')"
        />
        <th
          scope="col"
          v-text="$t('labels.validator')"
        />
        <th
          scope="col"
          v-text="$t('labels.votingPower')"
        />
        <th
          scope="col"
          v-text="$t('labels.cumulativeShare')"
        />
        <th
          scope="col"
          v-text="$t('labels.commission')"
        />
      </tr>
    </thead>
    <tbody>
      <TableValidatorsRow
        v-for="(validator, index) in validators"
        :key="index"
        :validator="validator"
        :rank="index"
      />
    </tbody>
  </table>
</template>

<script>
import TableValidatorsRow from "./TableValidatorsRow.vue";

export default {
  name: "TableValidators",
  description: "Display the validators list",
  components: {
    TableValidatorsRow
  },
  props: {
    validators: {
      type: Array,
      required: true,
      note: "The validators list to show"
    }
  }
};
</script>
