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
        v-text="name"
      />
    </td>
    <td class="text-center">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, height)"
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
import { ROUTE_NAMES } from "Constants";

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
      name: "",
      isFetching: false
    };
  },
  computed: {
    amount() {
      let amount = this.$n(this.delegation.entry.balance / 1000000, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${amount} COMM`;
    },
    height() {
      return this.delegation.entry.creation_height;
    },
    finalDate() {
      return new Date(this.delegation.entry.completion_time).toLocaleString();
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
    this.getName();
  }
};
</script>
