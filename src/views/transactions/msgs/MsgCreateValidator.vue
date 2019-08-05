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
          v-text="$t('labels.validatorAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, validatorAddress)"
            v-text="validatorAddress"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.publicKey')"
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
        <div class="col-12 col-md-9">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.rate')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="rate"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.maxRate')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="rateMax"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.maxChangeRate')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="rateChange"
            />
          </dl>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.description')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <dl>
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.moniker')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="descriptionMoniker"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.identity')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="descriptionIdentity"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.website')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="descriptionWebsite"
            />
            <dt
              class="com-font-s14-w700"
              v-text="$t('labels.details')"
            />
            <dd
              class="com-font-s14-w400"
              v-text="descriptionDetails"
            />
          </dl>
        </div>
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
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "MsgCreateValidator",
  description: "Display a create validator transaction message",
  components: {
    MsgTx
  },
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
    descriptionMoniker() {
      return this.message.value.description.moniker
        ? this.message.value.description.moniker
        : "-";
    },
    descriptionIdentity() {
      return this.message.value.description.identity
        ? this.message.value.description.identity
        : "-";
    },
    descriptionWebsite() {
      return this.message.value.description.website
        ? this.message.value.description.website
        : "-";
    },
    descriptionDetails() {
      return this.message.value.description.details
        ? this.message.value.description.details
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
    rate() {
      return this.message.value.commission.rate
        ? this.$n(this.message.value.commission.rate, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : "-";
    },
    rateChange() {
      return this.message.value.commission.max_change_rate
        ? this.$n(this.message.value.commission.max_change_rate, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : "-";
    },
    rateMax() {
      return this.message.value.commission.max_rate
        ? this.$n(this.message.value.commission.max_rate, {
            style: "percent",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : "-";
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
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
