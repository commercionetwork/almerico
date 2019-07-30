<template>
  <tr
    v-if="isFetching"
    class="text-center com-font-s14-w400"
    data-test="loading"
  >
    <td>
      <span v-text="$t('messages.loading')" />
    </td>
  </tr>
  <tr
    v-else-if="!isFetching && hasError"
    class="text-center text-danger com-font-s14-w400"
    data-test="has-error"
  >
    <td>
      <span v-text="$t('messages.fetchingError')" />
    </td>
  </tr>
  <tr
    v-else
    class="text-center com-font-s12-w400"
    data-test="item"
  >
    <td class="text-left">
      <router-link
        :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, unbonding.validator_address)"
        v-text="moniker"
      />
    </td>
    <td class="text-center">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, height)"
        v-text="height"
      />
    </td>
    <td class="text-right">
      <span v-text="amount" />
    </td>
    <td class="text-right">
      <span v-text="finalDate" />
    </td>
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";

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
    amount() {
      let amount = coinConverter({
        denom: this.$config.generic.coin.name.long,
        amount: this.unbonding.entry.balance
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return `${formatAmount} ${amount.denom}`;
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
        if (response.data) this.moniker = response.data.description.moniker;
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
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
