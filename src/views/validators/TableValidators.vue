<template>
  <div class="p-1 h-100 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex justify-content-between">
        <div class="col-12 col-md-8 offset-md-4">
          <SearchValidator />
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Rank</th>
              <th scope="col">Validator</th>
              <th scope="col">Voting power</th>
              <th scope="col">% cunulative share</th>
              <th scope="col">Self-Delegated</th>
              <th scope="col">Delegators(24h)</th>
              <th scope="col">Commission</th>
              <th scope="col">UpTime</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center com-font-s12-w400"
              v-for="validator in validators"
              :key="validator.operator_address"
            >
              <td
                class="align-middle"
                v-text="'1'"
              />
              <td class="align-middle">
                <router-link
                  :to="toValidatorDetails(validator.operator_address)"
                  v-text="validator.description.moniker"
                />
              </td>
              <td class="align-middle">
                <div v-text="validator.voting_power" />
                <div
                  class="text-black-50"
                  v-text="'TD'"
                />
              </td>
              <td
                class="align-middle"
                v-text="'TD'"
              />
              <td class="align-middle">
                <div v-text="'TD'" />
                <div
                  class="text-black-50"
                  v-text="'TD'"
                />
              </td>
              <td class="align-middle">
                'TD'
              </td>
              <td
                class="align-middle"
                v-text="getCommission(validator)"
              />
              <td
                class="align-middle"
                v-text="'TD'"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SearchValidator from "./SearchValidator.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "TableValidators",
  description: "Display the validators list",
  components: {
    SearchValidator
  },
  props: {
    validators: {
      type: Array,
      required: true,
      note: "The validators list to diplay"
    },
    isFetching: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getCommission(validator) {
      let rate = parseFloat(validator.commission.rate) * 100;
      return `${rate.toFixed(2)}%`;
    },
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATORS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
