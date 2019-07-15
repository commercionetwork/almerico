<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, event.height)"
        v-text="event.height"
      />
    </td>
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTIONS_DETAILS, event.txhash)"
        v-text="event.txhash"
        class="d-block text-truncate"
        style="max-width: 120px;"
      />
    </td>
    <td
      class="align-middle"
      :class="event.plus ? 'text-success' : 'text-danger'"
      v-text="amount"
    />
    <td
      class="align-middle"
      v-text="time"
    />
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";

export default {
  name: "ValidatorDetailsEventsRow",
  description: "Display a power event row of validator details",
  props: {
    event: {
      type: Object,
      required: true,
      note: "Object representing an event"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    amount() {
      let amount = {
        denom: "",
        amount: 0
      };
      if (
        Array.isArray(this.event.tx.value.msg[0].value.amount) &&
        this.event.tx.value.msg[0].value.amount.length > 0
      ) {
        amount = coinConverter(this.event.tx.value.msg[0].value.amount[0]);
      } else if (this.event.tx.value.msg[0].value.amount instanceof Object) {
        amount = coinConverter(this.event.tx.value.msg[0].value.amount);
      }
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
      return this.event.plus
        ? `+ ${formatAmount} ${amount.denom}`
        : `- ${formatAmount} ${amount.denom}`;
    },
    time() {
      return new Date(this.event.timestamp).toLocaleDateString();
    }
  },
  methods: {
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
