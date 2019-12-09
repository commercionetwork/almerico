<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.recipient')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, recipient)"
            v-text="recipient"
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
            v-for="(amount, index) in amounts"
            :key="index"
          >
            <span v-text="getAmountLabel(amount)" />
          </div>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.proof')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="proof"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.encryptionKey')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="encryptionKey"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.fromAddress')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, fromAddress)"
            v-text="fromAddress"
          />
        </div>
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgRequestDidDeposit",
  description: "Display a request did deposit transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a request did deposit message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    amounts() {
      return this.message.value.amount ? this.message.value.amount : [];
    },
    encryptionKey() {
      return this.message.value.encryption_key
        ? this.message.value.encryption_key
        : "-";
    },
    fromAddress() {
      return this.message.value.from_address
        ? this.message.value.from_address
        : "-";
    },
    proof() {
      return this.message.value.proof ? this.message.value.proof : "-";
    },
    recipient() {
      return this.message.value.recipient ? this.message.value.recipient : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    }
  },
  methods: {
    getAmountLabel(amount) {
      let formatAmount = this.$n(amount.amount, {
        style: "decimal"
      });
      return `${formatAmount} ${amount.denom}`;
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
