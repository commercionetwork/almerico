<template>
  <div class="p-3">
    <div
      v-if="Config.transaction_details.rows.hash"
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
      v-if="Config.transaction_details.rows.status"
      class="row py-1"
      data-test="row-status"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.status')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="result"
      />
    </div>
    <div
      v-if="Config.transaction_details.rows.block_height"
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
      v-if="Config.transaction_details.rows.date"
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
      v-if="Config.transaction_details.rows.fee"
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
      v-if="Config.transaction_details.rows.gas"
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
import Config from "Assets/json/config.json";

import { ROUTE_NAMES } from "Constants";
import { coinConverter } from "Utils";

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
      ROUTE_NAMES,
      Config
    };
  },
  computed: {
    date() {
      return new Date(this.transaction.timestamp).toLocaleString();
    },
    fee() {
      let fee = {
        denom: "",
        amount: 0
      };
      if (
        Array.isArray(this.transaction.tx.value.fee.amount) &&
        this.transaction.tx.value.fee.amount.length > 0
      ) {
        fee = coinConverter(this.transaction.tx.value.fee.amount[0]);
      }

      let formatFee = this.$n(fee.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatFee} ${fee.denom}`;
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
      return this.transaction.logs.find(log => typeof log.success !== undefined)
        .success
        ? "success"
        : "fail";
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
