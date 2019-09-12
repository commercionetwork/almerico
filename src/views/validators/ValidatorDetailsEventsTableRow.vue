<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, event.height)"
        v-text="event.height"
      />
    </td>
    <td class="align-middle">
      <router-link
        :to="toDetails(ROUTE_NAMES.TRANSACTION_DETAILS, event.txhash)"
        v-text="event.txhash"
        class="d-block text-truncate"
        style="max-width: 120px;"
      />
    </td>
    <td
      class="align-middle"
      :class="amountStyle"
      v-text="amount"
    />
    <td class="align-middle">
      <span v-text="time" />
    </td>
  </tr>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "ValidatorDetailsEventsTableRow",
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
      let denom = "";
      let exponent = 0;
      let tot = 0;
      let amounts = [];
      this.event.tx.value.msg.forEach(message => {
        if (Array.isArray(message.value.amount)) {
          message.value.amount.forEach(amount => amounts.push(amount));
        } else if (message.value.amount instanceof Object) {
          amounts.push(message.value.amount);
        }
      });
      if (amounts.length > 0) {
        denom = amounts[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        amounts.forEach(amount => {
          tot += parseFloat(amount.amount);
        });
      }
      if (tot === 0) return "*";
      let amount = coinsManager(denom, exponent, tot);

      let label = this.getAmountLabel(amount.amount, amount.denom);
      return this.event.plus ? `+ ${label}` : `- ${label}`;
    },
    amountStyle() {
      if (this.amount === "*") {
        return "text-black-50";
      } else if (this.event.plus) {
        return "text-success";
      } else {
        return "text-danger";
      }
    },
    time() {
      return new Date(this.event.timestamp).toLocaleDateString();
    }
  },
  methods: {
    getAmountLabel(amount, denom) {
      let formatAmount = this.$n(amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
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
  }
};
</script>
