<template>
  <table class="table table-striped">
    <thead>
      <tr class="text-center com-font-s13-w700">
        <th
          v-if="$config.validators.table.columns.ordering"
          scope="col"
          v-text="$t('labels.rank')"
          data-test="table-column-ordering"
        />
        <th
          v-if="$config.validators.table.columns.name"
          scope="col"
          v-text="$t('labels.validator')"
          data-test="table-column-name"
        />
        <th
          v-if="$config.validators.table.columns.voting_power"
          scope="col"
          v-text="$t('labels.votingPower')"
          data-test="table-column-power"
        />
        <th
          v-if="$config.validators.table.columns.share_percentage"
          scope="col"
          v-text="$t('labels.cumulativeShare')"
          data-test="table-column-share"
        />
        <th
          v-if="$config.validators.table.columns.commission"
          scope="col"
          v-text="$t('labels.commission')"
          data-test="table-column-commission"
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
