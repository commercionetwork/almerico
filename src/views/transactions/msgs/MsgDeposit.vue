<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.proposal')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.VOTING_DETAILS, proposal)"
            v-text="proposal"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.depositor')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, address)"
            v-text="address"
          />
        </div>
      </div>
      <div
        v-for="(amount,index) in amounts"
        :key="index"
        class="row p-1"
      >
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.amount')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="amountValue(amount)"
        />
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "MsgDeposit",
  description: "Display a deposit transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing an unjail message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    address() {
      return this.message.value.depositor ? this.message.value.depositor : "-";
    },
    amounts() {
      return this.message.value.amount ? this.message.value.amount : [];
    },
    proposal() {
      return this.message.value.proposal_id
        ? this.message.value.proposal_id
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  },
  methods: {
    amountValue(data) {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (data instanceof Object) {
        denom = data.denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        tot = parseFloat(data.amount);
      }
      let amount = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(amount.amount, amount.denom);
    },
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
          id: id
        }
      };
    }
  }
};
</script>
