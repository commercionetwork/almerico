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
          v-text="$t('labels.activationReference')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="activationReference"
        />
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.signer')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toDetails(ROUTE_NAMES.ACCOUNT_DETAILS, signer)"
            v-text="signer"
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
  name: "MsgPowerUpDid",
  description: "Display a power up did transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a power up did message"
    }
  },
  data() {
    return {
      ROUTE_NAMES
    };
  },
  computed: {
    activationReference() {
      return this.message.value.activation_reference
        ? this.message.value.activation_reference
        : "-";
    },
    amounts() {
      return this.message.value.amount
        ? this.message.value.amount
        : [];
    },
    recipient() {
      return this.message.value.recipient ? this.message.value.recipient : "-";
    },
    signer() {
      return this.message.value.signer ? this.message.value.signer : "-";
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
