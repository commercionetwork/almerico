<template>
  <div class="p-1 rounded-lg bg-light">
    <div class="row d-flex align-items-center">
      <div class="col-6 order-1 col-md-2 order-md-1">
        <span class="p-1">
          <img
            src="@/assets/img/logo.png"
            alt="validator logo"
            class="com-image-h50-w50"
          />
        </span>
      </div>
      <div class="col-6 order-2 col-md-2 order-md-3 d-flex justify-content-end">
        <span
          class="px-3 py-1 rounded-pill bg-success text-white com-font-s13-w700"
          v-text="status"
        />
      </div>
      <div class="col-12 order-3 col-md-8 order-md-2 d-flex flex-column">
        <span
          class="pb-2 com-font-s16-w700"
          v-text="validator.description.moniker"
        />
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.publicKey')"
        />
        <span
          class="text-break com-font-s14-w400"
          v-text="pubKey"
        />
        <span
          class="pt-1 com-font-s14-w700"
          v-text="$t('labels.address')"
        />
        <router-link
          :to="toAccountDetails(validator.operator_address)"
          v-text="validator.operator_address"
          class="text-break com-font-s14-w400"
        />
      </div>
    </div>
    <hr class="d-none d-md-block">
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Website</div>
      <div class="col-12 col-md-9 com-font-s14-w400">
        <a
          :href="validator.description.website"
          v-text="validator.description.website"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Commission</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="commission"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Voting power</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="votingPower"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Details</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="validator.description.details"
      />
    </div>

  </div>
</template>

<script>
import { ROUTE_NAMES, PREFIX } from "Constants";
import { bech32Manager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "ValidatorDetailsHeader",
  description: "Display the validator header",
  props: {
    validator: {
      type: Object,
      required: true,
      note: "Object representing a validator"
    }
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool"
    }),
    status() {
      return this.validator.status === 2 ? "Active" : "Inactive";
    },
    pubKey() {
      let hexValue = bech32Manager.decode(this.validator.operator_address);
      return bech32Manager.encode(hexValue, PREFIX.COMNET);
    },
    commission() {
      return this.$n(this.validator.commission.rate * 1, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    bonded() {
      return this.pool ? new Number(this.pool.bonded_tokens) : 0;
    },
    votingPower() {
      let power = this.$n(this.validator.tokens / 1000000, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      let percent = this.validator.tokens / this.bonded;
      return `${this.$n(percent, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })} (${power} COMM)`;
    }
  },
  methods: {
    toAccountDetails(id) {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
