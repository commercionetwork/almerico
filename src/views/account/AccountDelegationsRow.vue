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
        :to="toValidatorDetails(delegation.validator_address)"
        v-text="name"
      />
    </td>
    <td
      class="text-right"
      v-text="amount"
    />
    <td
      class="text-right"
      v-text="'todo'"
    />
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES } from "Constants";

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
      name: "",
      isFetching: false
    };
  },
  computed: {
    amount() {
      let amount = this.$n(this.delegation.shares / 1000000, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${amount} COMM`;
    }
  },
  methods: {
    async getName() {
      this.isFetching = true;
      try {
        const response = await api.requestValidator(
          this.delegation.validator_address
        );
        if (response.data) this.name = response.data.description.moniker;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    },
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATORS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  },
  mounted() {
    this.getName();
  }
};
</script>
