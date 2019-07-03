<template>
  <MsgTx :title="message.type">
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
      const amount = this.message.value.amount.amount
        ? this.message.value.amount.amount
        : "0";
      const comm = parseFloat(amount) / 1000000;
      const formatComm = this.$n(comm, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatComm} COMM`;
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