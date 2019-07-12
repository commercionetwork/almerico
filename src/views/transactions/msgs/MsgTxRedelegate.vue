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
            :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, validatorSrcAddress)"
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
            :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, validatorDstAddress)"
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
import { coinConverter } from "Utils";

export default {
  name: "MsgTxRedelegate",
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
      let amount = {
        denom: "",
        amount: 0
      };
      if (this.message.value.amount instanceof Object) {
        amount = coinConverter(this.message.value.amount);
      }
      let formatAmount = this.$n(amount.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${amount.denom}`;
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