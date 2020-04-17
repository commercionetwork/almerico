<template>
  <div class="p-3">
    <div
      v-if="$config.transaction_details.rows.hash"
      class="row py-1"
      data-test="row-hash"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.hash')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="transaction.txhash"
      />
    </div>
    <div
      v-if="$config.transaction_details.rows.status"
      class="row py-1"
      data-test="row-status"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.status')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <div v-text="result" />
        <div
          v-if="!resultStatus"
          data-test="row-status-details"
        >
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.details')"
          />
          <div v-text="transaction.raw_log" />
        </div>
      </div>
    </div>
    <div
      v-if="$config.transaction_details.rows.block_height"
      class="row py-1"
      data-test="row-block-height"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.height')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, transaction.height)"
          v-text="transaction.height"
        />
      </div>
    </div>
    <div
      v-if="$config.transaction_details.rows.date"
      class="row py-1"
      data-test="row-date"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.date')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="date"
      />
    </div>
    <div
      v-if="$config.transaction_details.rows.fee"
      class="row py-1"
      data-test="row-fee"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.fee')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="fee"
      />
    </div>
    <div
      v-if="$config.transaction_details.rows.gas"
      class="row py-1"
      data-test="row-gas"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.gasUsedWanted')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        {{ gasUsed }}{{ "/" }}{{ gasWanted }}
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";

export default {
  name: "TransactionDetailsInfo",
  description: "Display the transaction's information",
  props: {
    transaction: {
      type: Object,
      required: true,
      note: "Object representing a transaction"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    date() {
      return new Date(this.transaction.timestamp).toLocaleString();
    },
    gasWanted() {
      return this.$n(this.transaction.gas_wanted, {
        style: "decimal",
        maximumFractionDigits: 0
      });
    },
    gasUsed() {
      return this.$n(this.transaction.gas_used, {
        style: "decimal",
        maximumFractionDigits: 0
      });
    },
    result() {
      return this.resultStatus
        ? this.$t("labels.success")
        : this.$t("labels.fail");
    },
    resultStatus() {
      return this.transaction.code ? false : true;
    },
    fee() {
      let denom = "";
      let exponent = 0;
      let tot = 0;
      if (
        Array.isArray(this.transaction.tx.value.fee.amount) &&
        this.transaction.tx.value.fee.amount.length > 0
      ) {
        denom = this.transaction.tx.value.fee.amount[0].denom;
        let coin = this.$config.generic.coins.find(
          coin => coin.denom === denom
        );
        exponent = coin ? coin.exponent : 0;
        this.transaction.tx.value.fee.amount.forEach(amount => {
          tot += parseFloat(amount.amount);
        });
      }
      let fee = coinsManager(denom, exponent, tot);

      return this.getAmountLabel(fee.amount, fee.denom);
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
