<template>
  <div class="p-1 rounded-lg bg-light">
    <div class="row p-1">
      <div class="col-12">
        <h2
          class="com-font-s16-w700"
          v-text="$t('titles.information')"
        />
      </div>
    </div>
    <hr>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">TxHash</div>
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="transaction.txhash"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Status</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="result"
      >
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Height</div>
      <div class="col-12 col-md-9 com-font-s14-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, transaction.height)"
          v-text="transaction.height"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Time</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="time"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Fee</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="fee"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Gas (used/wanted)</div>
      <div class="col-12 col-md-9 com-font-s14-w400">
        {{ gasUsed }}{{ "/" }}{{ gasWanted}}
      </div>
    </div>
    <div
      v-if="memo"
      class="row p-1"
    >
      <div class="col-12 col-md-3 com-font-s14-w700">Memo</div>
      <div
        class="col-12 col-md-9 text-lowercase com-font-s14-w400"
        v-text="memo"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "TransactionsDetailsInfo",
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
    fee() {
      let fee = 0;
      if (this.transaction.tx.value.fee.amount) {
        fee = this.transaction.tx.value.fee.amount / 1000000;
      }
      if (Array.isArray(this.transaction.tx.value.fee.amount)) {
        fee = this.transaction.tx.value.fee.amount[0].amount / 1000000;
      }
      let formatFee = this.$n(fee, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatFee} COMM`;
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
    memo() {
      return this.transaction.tx.value.memo;
    },
    result() {
      return this.transaction.logs[0].success ? "success" : "fail";
    },
    time() {
      return new Date(this.transaction.timestamp).toLocaleString();
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
