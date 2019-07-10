<template>
  <tr
    v-if="isFetching"
    class="text-center com-font-s12-w400"
  >
    <td v-text="$t('messages.loading')" />
  </tr>
  <tr
    v-else
    class="text-center com-font-s12-w400"
  >
    <td class="text-left">
      <router-link
        :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, delegation.validator_address)"
        v-text="moniker"
      />
    </td>
    <td
      class="text-right"
      v-text="amount"
    />
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "AccountDelegationsRow",
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
      moniker: "",
      isFetching: false
    };
  },
  computed: {
    ...mapGetters("account", {
      balances: "balances"
    }),
    denom() {
      return this.balances && this.balances.length > 0
        ? this.balances[0].denom
        : "";
    },
    amount() {
      let amount = coinConverter({
        denom: this.denom,
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
        console.log(error);
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
