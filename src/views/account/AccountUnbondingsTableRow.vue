<template>
  <tr
    v-if="isFetching"
    data-test="loading"
  >
    <td class="text-center">
      <span
        class="text-info com-font-s14-w400"
        v-text="$t('messages.loading')"
      />
    </td>
  </tr>
  <tr
    v-else-if="!isFetching && hasError"
    data-test="has-error"
  >
    <td class="text-center">
      <span
        class="text-danger com-font-s14-w400"
        v-text="$t('messages.fetchingError')"
      />
    </td>
  </tr>
  <tr
    v-else
    data-test="item"
  >
    <td class="text-left">
      <router-link
        :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, unbonding.validator_address)"
        class="com-font-s12-w400"
        v-text="moniker"
      />
    </td>
    <td class="text-center">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, height)"
        class="com-font-s12-w400"
        v-text="height"
      />
    </td>
    <td class="text-right">
      <span
        class="com-font-s12-w400"
        v-text="amount"
      />
    </td>
    <td class="text-right">
      <span
        class="com-font-s12-w400"
        v-text="finalDate"
      />
    </td>
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "AccountUnbondingsTableRow",
  description: "Display a row of unbonding delegations list",
  props: {
    unbonding: {
      type: Object,
      required: true,
      note: "The unbonding delegation to show"
    }
  },
  data() {
    return {
      ROUTE_NAMES,
      hasError: false,
      isFetching: false,
      moniker: ""
    };
  },
  computed: {
    coin() {
      return this.$config.generic.coins.find(coin => coin.stakeable);
    },
    amount() {
      let denom = this.coin ? this.coin.denom : "";
      let exponent = this.coin ? this.coin.exponent : "";
      let balance = parseFloat(this.unbonding.entry.balance);

      let amount = coinsManager(denom, exponent, balance);
      return this.getAmountLabel(amount.amount, amount.denom);
    },
    height() {
      return this.unbonding.entry.creation_height;
    },
    finalDate() {
      return new Date(
        this.unbonding.entry.completion_time
      ).toLocaleDateString();
    }
  },
  methods: {
    async getMoniker() {
      this.isFetching = true;
      try {
        const response = await api.requestValidator(
          this.unbonding.validator_address
        );
        if (response.data.result) this.moniker = response.data.result.description.moniker;
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
    },
    getAmountLabel(amount, denom) {
      let formatAmount = this.$n(amount, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return `${formatAmount} ${denom}`;
    },
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  },
  mounted() {
    this.getMoniker();
  }
};
</script>
