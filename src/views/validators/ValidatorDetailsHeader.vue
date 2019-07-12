<template>
  <div class="p-3">
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
          class="pb-2 text-capitalize com-font-s16-w700"
          v-text="validator.description.moniker"
        />
        <span
          class="com-font-s14-w700"
          v-text="$t('labels.operatorAddress')"
        />
        <span
          class="text-break com-font-s14-w400"
          v-text="validator.operator_address"
        />
        <span
          class="pt-1 com-font-s14-w700"
          v-text="$t('labels.address')"
        />
        <router-link
          :to="toAccountDetails()"
          v-text="address"
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
import { ROUTE_NAMES, SETUP } from "Constants";
import { coinConverter } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "ValidatorDetailsHeader",
  description: "Display the validator header",
  props: {
    address: {
      type: String,
      required: true,
      note: "The account's address"
    },
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
      return this.validator.status === 2
        ? this.$t("buttons.active")
        : this.$t("buttons.inactive");
    },
    commission() {
      return this.$n(parseFloat(this.validator.commission.rate), {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    votingPower() {
      let percent =
        this.bonded > 0
          ? parseFloat(this.validator.delegator_shares) / this.bonded
          : 0;
      let formatPercent = this.$n(percent, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      let power = coinConverter({
        denom: SETUP.MICRO_COIN,
        amount: this.validator.delegator_shares
      });
      let formatPower = this.$n(power.amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatPercent} (${formatPower} ${power.denom})`;
    }
  },
  methods: {
    toAccountDetails() {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: this.address
        }
      };
    }
  }
};
</script>
