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
        :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, delegation.validator_address)"
        class=" com-font-s12-w400"
        v-text="moniker"
      />
    </td>
    <td class="text-right">
      <span
        class=" com-font-s12-w400"
        v-text="amount"
      />
    </td>
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";

export default {
  name: "AccountDelegationsTableRow",
  description: "Display a row of delegations list",
  props: {
    delegation: {
      type: Object,
      required: true,
      note: "The delegation to show"
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
        amount: this.delegation.shares
      });
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
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
          id: id
        }
      };
    }
  },
  mounted() {
    this.getMoniker();
  }
};
</script>
