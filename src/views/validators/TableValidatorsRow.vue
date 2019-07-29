<template>
  <tr class="text-center com-font-s13-w400">
    <td
      v-if="$config.validators.table.columns.ordering"
      class="align-middle"
      data-test="table-column-ordering"
    >
      <span v-text="validatorRank" />
    </td>
    <td
      v-if="$config.validators.table.columns.name"
      class="align-middle"
      data-test="table-column-name"
    >
      <router-link
        :to="toValidatorDetails(validator.operator_address)"
        v-text="validator.description.moniker"
      />
    </td>
    <td
      v-if="$config.validators.table.columns.voting_power"
      class="align-middle"
      data-test="table-column-power"
    >
      <div v-text="votingPower" />
      <div v-text="powerPercent" />
    </td>
    <td
      v-if="$config.validators.table.columns.share_percentage"
      class="align-middle"
      data-test="table-column-share"
    >
      <span v-text="cumulative" />
    </td>
    <td
      v-if="$config.validators.table.columns.commission"
      class="align-middle"
      data-test="table-column-commission"
    >
      <span v-text="commission" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "TableValidatorsRow",
  description: "Display a row of the validators list",
  props: {
    validator: {
      type: Object,
      required: true,
      note: "Object representing a validator"
    },
    rank: {
      type: Number,
      required: true,
      note: "The validator rank"
    }
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool"
    }),
    commission() {
      return this.$n(parseFloat(this.validator.commission.rate), {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    cumulative() {
      return this.$n(this.validator.cumulative, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    validatorRank() {
      return this.rank + 1;
    },
    votingPower() {
      let power = coinConverter({
        denom: this.$config.generic.coin.name.long,
        amount: this.validator.tokens
      });
      let formatPower = this.$n(power.amount, {
        style: "decimal",
        maximumFractionDigits: 0
      });
      return `${formatPower} ${power.denom}`;
    },
    powerPercent() {
      let percent =
        this.bonded > 0 ? parseFloat(this.validator.tokens) / this.bonded : 0;
      return percent >= 0
        ? this.$n(percent, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : "- %";
    }
  },
  methods: {
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATOR_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
