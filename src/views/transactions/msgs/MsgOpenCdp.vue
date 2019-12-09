<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.depositor')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, depositor)"
            v-text="depositor"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.amount')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <div
            v-for="(deposit, index) in depositAmount"
            :key="index"
          >
            <span v-text="getAmountLabel(deposit)" />
          </div>
        </div>
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgOpenCdp",
  description: "Display a open CDP transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a open CDP message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    depositAmount() {
      return this.message.value.deposit_amount
        ? this.message.value.deposit_amount
        : [];
    },
    depositor() {
      return this.message.value.depositor ? this.message.value.depositor : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  },
  methods: {
    getAmountLabel(deposit) {
      let formatAmount = this.$n(deposit.amount, {
        style: "decimal",
      });
      return `${formatAmount} ${deposit.denom}`;
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
