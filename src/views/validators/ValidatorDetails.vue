<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.validatorDetails')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div
      v-if="isFetching"
      class="com-font-s14-w400"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && hasError"
      class="text-center text-danger com-font-s14-w400"
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded"
      data-test="items"
    >
      <div class="col-12 p-0">
        <div class="row">
          <div class="col-12">
            <ValidatorDetailsHeader
              :address="accountAddress"
              :validator="validator"
            />
          </div>
        </div>
        <div class="px-5 py-3">
          <div class="row py-3">
            <div class="col-12">
              <ValidatorDetailsDelegated
                :address="accountAddress"
                :delegations="delegations"
              />
            </div>
          </div>
          <div class="row py-3">
            <div class="col-12 col-md-6">
              <ValidatorDetailsDelegators
                :address="accountAddress"
                :delegations="delegations"
                :validator="validator"
              />
            </div>
            <div class="col-12 col-md-6 pt-3 pt-md-0">
              <ValidatorDetailsEvents :events="events" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "Components/common/SearchBar.vue";
import ValidatorDetailsDelegated from "./ValidatorDetailsDelegated.vue";
import ValidatorDetailsDelegators from "./ValidatorDetailsDelegators.vue";
import ValidatorDetailsEvents from "./ValidatorDetailsEvents.vue";
import ValidatorDetailsHeader from "./ValidatorDetailsHeader.vue";

import api from "Store/validators/api";
import apiTxs from "Store/transactions/api";
import { PREFIX, TX_TYPES } from "Constants";
import { bech32Manager } from "Utils";

export default {
  name: "ValidatorDetails",
  description: "Display the validator details",
  components: {
    SearchBar,
    ValidatorDetailsDelegated,
    ValidatorDetailsDelegators,
    ValidatorDetailsEvents,
    ValidatorDetailsHeader
  },
  data() {
    return {
      hasError: false,
      isFetching: false,
      delegations: [],
      events: [],
      validator: {}
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
  watch:{
    validatorAddress(value){
      this.getValidatorData(value);
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
        if (this.validator.description.identity.length > 0) {
          const res = await api.requestValidatorIdentity(
            this.validator.description.identity
          );
          if (res.data.completions[0].thumbnail) {
            this.validator.imageUrl = res.data.completions[0].thumbnail;
          }
        }
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
        this.hasError = true;
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
