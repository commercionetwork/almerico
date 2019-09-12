<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th
            v-if="$config.validators.table.columns.ordering"
            scope="col"
            data-test="table-column-ordering"
          >
            <span v-text="$t('labels.rank')" />
          </th>
          <th
            v-if="$config.validators.table.columns.name"
            scope="col"
            data-test="table-column-name"
          >
            <span v-text="$t('labels.validator')" />
          </th>
          <th
            v-if="$config.validators.table.columns.voting_power"
            scope="col"
            data-test="table-column-power"
          >
            <span v-text="$t('labels.votingPower')" />
          </th>
          <th
            v-if="$config.validators.table.columns.share_percentage"
            scope="col"
            data-test="table-column-share"
          >
            <span v-text="$t('labels.cumulativeShare')" />
          </th>
          <th
            v-if="$config.validators.table.columns.commission"
            scope="col"
            data-test="table-column-commission"
          >
            <span v-text="$t('labels.commission')" />
          </th>
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
  </div>
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
