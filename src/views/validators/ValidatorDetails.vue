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
      class="alert alert-warning"
      role="alert"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && hasError"
      class="alert alert-danger"
      role="alert"
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded com-bg-header"
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
        <div class="px-5 py-3 com-bg-body">
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
import { bech32Manager } from "Utils";
import { mapGetters } from "vuex";

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
      hasErrorValidator: false,
      isFetchingValidator: false,
      delegations: [],
      validator: {}
    };
  },
  computed: {
    ...mapGetters("transactions", {
      isFetchingTxs: "isFetching",
      message: "message",
      transactions: "transactions"
    }),
    isFetching() {
      return this.isFetchingValidator || this.isFetchingTxs;
    },
    hasError() {
      return this.hasErrorValidator || this.message;
    },
    events() {
      return this.transactions.reduce((events, transaction) => {
        if (transaction.logs && transaction.logs.length > 0) {
          transaction.logs.forEach(log => {
            if (log.events && log.events.length > 0) {
              log.events.forEach(event => {
                if (event.attributes && event.attributes.length > 0) {
                  event.attributes.forEach(attribute => {
                    if (
                      attribute.key === "recipient" &&
                      attribute.value === this.accountAddress
                    ) {
                      transaction.plus = true;
                      events.push(transaction);
                    }
                    if (
                      attribute.key === "sender" &&
                      attribute.value === this.accountAddress
                    ) {
                      transaction.plus = false;
                      events.push(transaction);
                    }
                  });
                }
              });
            }
          });
        }

        return events;
      }, []);
    },
    accountAddress() {
      let hexValue = bech32Manager.decode(this.validatorAddress);
      return bech32Manager.encode(
        hexValue,
        this.$config.generic.prefixes.account.address
      );
    },
    validatorAddress() {
      return this.$route.params.id;
    }
  },
  watch: {
    validatorAddress(value) {
      this.getValidatorData(value);
    }
  },
  methods: {
    async getValidatorData(address) {
      let response = null;
      this.isFetchingValidator = true;
      try {
        // get validator
        response = await api.requestValidator(address);
        this.validator = response.data.result;
        // get image
        if (
          this.validator.description.identity &&
          this.validator.description.identity.length > 0
        ) {
          const res = await api.requestValidatorPictures(
            this.validator.description.identity
          );
          if (res.data.them && res.data.them.length > 0) {
            res.data.them.forEach(item => {
              let pictures = item.pictures;
              if ("primary" in pictures) {
                this.validator.imageUrl = pictures.primary.url;
                return;
              }
            });
          }
        }
        // get delegations
        response = await api.requestValidatorDelegations(address);
        this.delegations = response.data.result;
      } catch (error) {
        this.hasErrorValidator = true;
      } finally {
        this.isFetchingValidator = false;
      }
    }
  },
  created() {
    this.getValidatorData(this.validatorAddress);
  }
};
</script>
