<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.delegatorAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, delegatorAddress)"
            v-text="delegatorAddress"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.validatorSrcAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, validatorSrcAddress)"
            v-text="validatorSrcAddress"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.validatorDstAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, validatorDstAddress)"
            v-text="validatorDstAddress"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.amount')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="amount"
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
  name: "MsgBeginRedelegate",
  description: "Display a redelegate transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a redelegate message"
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
      if (this.message.value.amount instanceof Object) {
        denom = this.message.value.amount.denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        tot = parseFloat(this.message.value.amount.amount);
      }
      let amount = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(amount.amount, amount.denom);
    },
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : "-";
    },
    validatorDstAddress() {
      return this.message.value.validator_dst_address
        ? this.message.value.validator_dst_address
        : "-";
    },
    validatorSrcAddress() {
      return this.message.value.validator_src_address
        ? this.message.value.validator_src_address
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
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