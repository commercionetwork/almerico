<template>
  <table class="table table-striped">
    <thead>
      <tr class="text-center com-font-s13-w700">
        <th scope="col">Rank</th>
        <th scope="col">Validator</th>
        <th scope="col">Voting power</th>
        <th scope="col">% Cumulative share</th>
        <th scope="col">Commission</th>
      </tr>
    </thead>
    <tbody>
      <TableValidatorsRow
        v-for="(validator, index) in filteredValidators"
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
    filter: {
      type: Object,
      required: false,
      note: "Object representing the validators filter"
    },
    pool: {
      type: Object,
      required: true,
      note: "Object representing the pool"
    },
    validators: {
      type: Array,
      required: true,
      note: "The validators list to show"
    }
  },
  computed: {
    filteredValidators() {
      const all = [...this.validators];
      const bonded = parseInt(this.pool.bonded_tokens);
      let cumulative = 0;
      const validators = all
        .sort(function(a, b) {
          return b.tokens - a.tokens;
        })
        .map(validator => {
          cumulative += validator.tokens / bonded;
          validator.cumulative = cumulative;
          return validator;
        });
      const filtered =
        this.filter && this.filter.moniker
          ? validators.filter(
              validator => validator.description.moniker === this.filter.moniker
            )
          : validators;
      return filtered;
    }
  }
};
</script>
