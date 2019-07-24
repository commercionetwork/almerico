<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div class="col-12">
          <div
            class="com-font-s14-w700"
            v-text="$t('labels.description')"
          />
          <div class="px-3 row p-1">
            <div
              class="col-12 col-md-3 com-font-s14-w700"
              v-text="$t('labels.moniker')"
            />
            <div
              class="col-12 col-md-9 text-break com-font-s14-w400"
              v-text="moniker"
            />
          </div>
          <div class="px-3 row p-1">
            <div
              class="col-12 col-md-3 com-font-s14-w700"
              v-text="$t('labels.identity')"
            />
            <div
              class="col-12 col-md-9 text-break com-font-s14-w400"
              v-text="identity"
            />
          </div>
          <div class="px-3 row p-1">
            <div
              class="col-12 col-md-3 com-font-s14-w700"
              v-text="$t('labels.website')"
            />
            <div
              class="col-12 col-md-9 text-break com-font-s14-w400"
              v-text="website"
            />
          </div>
          <div class="px-3 row p-1">
            <div
              class="col-12 col-md-3 com-font-s14-w700"
              v-text="$t('labels.details')"
            />
            <div
              class="col-12 col-md-9 text-break com-font-s14-w400"
              v-text="details"
            />
          </div>
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.address')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toValidatorDetails(address)"
            v-text="address"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.commissionRate')"
        />
        <div
          class="col-12 col-md-9 text-break com-font-s14-w400"
          v-text="commissionRate"
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
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgTxEditValidator",
  description: "Display an edit validator transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing an edit validator message"
    }
  },
  computed: {
    address() {
      return this.message.value.address ? this.message.value.address : "-";
    },
    commissionRate() {
      return this.message.value.commission_rate
        ? this.message.value.commission_rate
        : "-";
    },
    details() {
      return this.message.value.Description.details
        ? this.message.value.Description.details
        : "-";
    },
    identity() {
      return this.message.value.Description.identity
        ? this.message.value.Description.identity
        : "-";
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation
        ? this.message.value.min_self_delegation
        : "-";
    },
    moniker() {
      return this.message.value.Description.moniker
        ? this.message.value.Description.moniker
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    },
    website() {
      return this.message.value.Description.website
        ? this.message.value.Description.website
        : "-";
    }
  },
  methods: {
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATOR_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  }
};
</script>
