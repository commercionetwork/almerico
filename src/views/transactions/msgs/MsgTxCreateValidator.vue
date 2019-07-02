<template>
  <div class="p-1 rounded bg-white border">
    <div class="row p-1">
      <div class="col-12">
        <h3
          class="text-secondary com-font-s16-w700"
          v-text="message.type"
        />
      </div>
    </div>
    <hr>
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
        v-text="$t('labels.validatorAddress')"
      />
      <div class="col-12 col-md-9 text-break com-font-s14-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, validatorAddress)"
          v-text="validatorAddress"
        />
      </div>
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.publickey')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="pubkey"
      />
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
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.commission')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="commission"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.description')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="description"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.minSelfDelegation')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="minSelfDelegation"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTxCreateValidator",
  description: "Display a create validator transaction message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a create validator message"
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
    commission() {
      return this.message.value.commission
        ? this.message.value.commission
        : "-";
    },
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : "-";
    },
    description() {
      return this.message.value.description
        ? this.message.value.description
        : "-";
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation
        ? this.message.value.min_self_delegation
        : "-";
    },
    pubkey() {
      return this.message.value.pubkey ? this.message.value.pubkey : "-";
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
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
