<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
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
            v-text="validator.status"
          />
        </div>
        <div class="col-12 order-3 col-md-8 order-md-2 d-flex flex-column">
          <span
            class="pb-2 com-font-s16-w700"
            v-text="validator.name"
          />
          <span
            class="com-font-s14-w700"
            v-text="$t('labels.publicKey')"
          />
          <span
            class="text-break com-font-s14-w400"
            v-text="validator.pub_key"
          />
          <span
            class="pt-1 com-font-s14-w700"
            v-text="$t('labels.address')"
          />
          <router-link
            :to="toAccountDetails(validator.address)"
            v-text="validator.address"
            class="text-break com-font-s14-w400"
          />
        </div>
      </div>
      <hr class="d-none d-md-block">
      <div class="row p-1">
        <div class="col-12 col-md-3 com-font-s14-w700">Website</div>
        <div class="col-12 col-md-9 com-font-s14-w400">
          <a
            :href="validator.site"
            v-text="validator.site"
          />
        </div>
      </div>
      <div class="row p-1">
        <div class="col-12 col-md-3 com-font-s14-w700">Commission</div>
        <div
          class="col-12 col-md-9 com-font-s14-w400"
          v-text="`${validator.commission}%`"
        />
      </div>
      <div class="row p-1">
        <div class="col-12 col-md-3 com-font-s14-w700">Uptime</div>
        <div
          class="col-12 col-md-9 com-font-s14-w400"
          v-text="`${validator.uptime}%`"
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
        <div class="col-12 col-md-3 com-font-s14-w700">Bonded height</div>
        <div class="col-12 col-md-9 com-font-s14-w400">1</div>
      </div>
      <div class="row p-1">
        <div class="col-12 col-md-3 com-font-s14-w700">Details</div>
        <div
          class="col-12 col-md-9 com-font-s14-w400"
          v-text="validator.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

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
    isFetching() {
      return false;
    },
    votingPower() {
      let percent = `${this.validator.voting.power_percent}%`;
      let power = this.validator.voting.power.toLocaleString();
      return `${percent} (${power} ATOM)`;
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
