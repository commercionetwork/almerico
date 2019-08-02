<template>
  <div class="p-3">
    <div class="row d-flex align-items-center">
      <div class="col-6 order-1 col-md-2 order-md-1 d-flex justify-content-md-center">
        <span class="p-1">
          <img
            v-if="hasImage"
            :src="validator.imageUrl"
            alt="validator logo"
            class="com-image-h50-w50"
          />
          <Icon
            v-else
            name="brands/hubspot"
            scale="3"
            class="text-black-50"
          />
        </span>
      </div>
      <div class="col-6 order-2 col-md-2 order-md-3 d-flex justify-content-end">
        <span
          class="px-3 py-1 rounded-pill com-font-s13-w700"
          :class="validator.status === 2 ? 'bg-success' : 'bg-warning'"
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
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.website')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <a
          :href="validator.description.website"
          v-text="validator.description.website"
        />
      </div>
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.commission')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="commission"
      />
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.votingPower')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <span v-text="powerPercent" />
        <span v-text="' ('" />
        <span v-text="votingPower" />
        <span v-text="')'" />
      </div>
    </div>
    <div class="row p-1">
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.details')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="validator.description.details"
      />
    </div>
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/brands/hubspot";

import { ROUTE_NAMES } from "Constants";
import { coinsManager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "ValidatorDetailsHeader",
  description: "Display the validator header",
  components: {
    Icon
  },
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
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    commission() {
      return this.$n(parseFloat(this.validator.commission.rate), {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    hasImage() {
      return this.validator.imageUrl;
    },
    status() {
      return this.validator.status === 2
        ? this.$t("buttons.active")
        : this.$t("buttons.inactive");
    },
    votingPower() {
      let coin = this.$config.generic.coins.find(coin => coin.stakeable);
      let denom = coin ? coin.denom : "";
      let exponent = coin ? coin.exponent : "";
      let amount = parseFloat(this.validator.tokens);

      let power = coinsManager(denom, exponent, amount);

      return this.getPowerLabel(power.amount, power.denom);
    },
    powerPercent() {
      let percent =
        this.bonded > 0 ? parseFloat(this.validator.tokens) / this.bonded : 0;
      return this.$n(percent, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  },
  methods: {
    getPowerLabel(amount, denom) {
      let formatAmount = this.$n(amount, {
        style: "decimal",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
      return `${formatAmount} ${denom}`;
    },
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
