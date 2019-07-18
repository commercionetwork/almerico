<template>
  <tr
    v-if="isFetching"
    class="text-center com-font-s14-w400"
    data-test="loading"
  >
    <td v-text="$t('messages.loading')" />
  </tr>
  <tr
    v-else-if="!isFetching && hasError"
    class="text-center text-danger com-font-s14-w400"
    data-test="has-error"
  >
    <td v-text="$t('messages.fetchingError')" />
  </tr>
  <tr
    v-else
    class="text-center com-font-s12-w400"
    data-test="item"
  >
    <td class="text-left">
      <router-link
        :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, delegation.validator_address)"
        v-text="moniker"
      />
    </td>
    <td class="text-center">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, height)"
        v-text="height"
      />
    </td>
    <td
      class="text-right"
      v-text="amount"
    />
    <td
      class="text-right"
      v-text="finalDate"
    />
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES, SETUP } from "Constants";
import { coinConverter } from "Utils";

export default {
  name: "AccountUnbondingsRow",
  description: "Display a row of unbonding delegations list",
  props: {
    delegation: {
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
        denom: SETUP.MICRO_COIN,
        amount: this.delegation.entry.balance
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return `${formatAmount} ${amount.denom}`;
    },
    height() {
      return this.delegation.entry.creation_height;
    },
    finalDate() {
      return new Date(
        this.delegation.entry.completion_time
      ).toLocaleDateString();
    }
  },
  methods: {
    async getMoniker() {
      this.isFetching = true;
      try {
        const response = await api.requestValidator(
          this.delegation.validator_address
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
