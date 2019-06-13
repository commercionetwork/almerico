<template>
  <div class="p-1 rounded-lg bg-light border">
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
      <div class="col-12 col-md-3 com-font-s13-w700">TxHash</div>
      <div
        class="col-12 col-md-9 text-break com-font-s13-w400"
        v-text="transaction.txhash"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Status</div>
      <div
        class="col-12 col-md-9 com-font-s13-w400"
        v-text="result"
      >
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Height</div>
      <div class="col-12 col-md-9 com-font-s13-w400">
        <router-link
          :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, transaction.height)"
          v-text="transaction.height"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Time</div>
      <div
        class="col-12 col-md-9 com-font-s13-w400"
        v-text="time"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Fee</div>
      <div
        class="col-12 col-md-9 com-font-s13-w400"
        v-text="fee"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Gas</div>
      <div
        class="col-12 col-md-9 com-font-s13-w400"
        v-text="gas"
      />
    </div>
    <div v-if="memo" class="row p-1">
      <div class="col-12 col-md-3 com-font-s13-w700">Memo</div>
      <div
        class="col-12 col-md-9 text-lowercase com-font-s13-w400"
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
      let fee = this.transaction.tx.value.fee.amount
        ? this.transaction.tx.value.fee.amount
        : 0;
      return `${fee} COMM`;
    },
    gas() {
      return this.transaction.tx.value.fee.gas;
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
