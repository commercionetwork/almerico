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
import { coinsManager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "TableValidatorsRow",
  description: "Display a row of the validators list",
  props: {
    validator: {
      type: Object,
      required: true,
      note: "Object representing a validator"
    }
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool"
    }),
    commission() {
      return this.$n(
        parseFloat(this.validator.commission.commission_rates.rate),
        {
          style: "percent",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );
    },
    cumulative() {
      return this.validator.cumulative
        ? this.$n(this.validator.cumulative, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : "-";
    },
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    validatorRank() {
      return this.validator.rank;
    },
    votingPower() {
      let coin = this.$config.generic.coins.find(coin => coin.stakeable);
      let denom = coin ? coin.denom : "";
      let exponent = coin ? coin.exponent : "";
      let amount = parseFloat(this.validator.tokens);

      let power = coinsManager(denom, exponent, amount);

      return this.getPowerLabel(power.amount, power.denom);
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
    getPowerLabel(amount, denom) {
      let formatAmount = this.$n(amount, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return `${formatAmount} ${denom}`;
    },
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
