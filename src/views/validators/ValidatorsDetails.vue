<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-8 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-text="$t('titles.validatorDetails')"
        />
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-start justify-content-md-end">
        &nbsp;
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div v-else>
        <div>
          <ValidatorDetailsHeader
            :address="accountAddress"
            :validator="validator"
          />
        </div>
        <div class="mt-3">
          <ValidatorDetailsDelegated
            :address="accountAddress"
            :delegations="delegations"
          />
        </div>
        <div class="row mt-3">
          <div class="col-12 col-md-6">
            <ValidatorDetailsDelegators
              :address="accountAddress"
              :delegations="delegations"
              :validator="validator"
            />
          </div>
          <div class="col-12 col-md-6 mt-3 mt-md-0">
            <ValidatorDetailsEvents :events="events" />
          </div>
        </div>
        <div class="mt-3">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidatorDetailsDelegated from "./ValidatorDetailsDelegated.vue";
import ValidatorDetailsDelegators from "./ValidatorDetailsDelegators.vue";
import ValidatorDetailsEvents from "./ValidatorDetailsEvents.vue";
import ValidatorDetailsHeader from "./ValidatorDetailsHeader.vue";

import api from "Store/validators/api";
import apiTxs from "Store/transactions/api";
import { PREFIX, TX_TYPES } from "Constants";
import { bech32Manager } from "Utils";

export default {
  name: "ValidatorsDetails",
  description: "Display the validator details",
  components: {
    ValidatorDetailsDelegated,
    ValidatorDetailsDelegators,
    ValidatorDetailsEvents,
    ValidatorDetailsHeader
  },
  data() {
    return {
      isFetching: false,
      delegations: [],
      events: [],
      validator: null
    };
  },
  computed: {
    accountAddress() {
      let hexValue = bech32Manager.decode(this.validatorAddress);
      return bech32Manager.encode(hexValue, PREFIX.COMNET);
    },
    validatorAddress() {
      return this.$route.params.id;
    }
  },
  methods: {
    async getValidatorData(address) {
      let response = null;
      this.isFetching = true;
      try {
        // get validator
        response = await api.requestValidator(address);
        this.validator = response.data;
        // get delegations
        response = await api.requestValidatorDelegations(address);
        this.delegations = response.data;
        // get plus events
        Object.values(TX_TYPES).forEach(async type => {
          response = await apiTxs.requestTransactions({
            tag: `action=${type}&destination-validator=${this.validatorAddress}`
          });
          response.data.forEach(event => {
            event.plus = true;
            this.events.push(event);
          });
        });
        // get minus events
        Object.values(TX_TYPES).forEach(async type => {
          response = await apiTxs.requestTransactions({
            tag: `action=${type}&source-validator=${this.validatorAddress}`
          });
          response.data.forEach(event => {
            event.plus = false;
            this.events.push(event);
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getValidatorData(this.validatorAddress);
  }
};
</script>
