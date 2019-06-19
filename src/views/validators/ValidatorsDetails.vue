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
          <ValidatorDetailsHeader :validator="validator" />
        </div>
        <div class="mt-3">
          <!-- <ValidatorDetailsDelegated :validator="validator" /> -->
        </div>
        <div class="row mt-3">
          <div class="col-12 col-md-6">
            <!-- <ValidatorDetailsDelegators /> -->
          </div>
          <div class="col-12 col-md-6 mt-3 mt-md-0">
            <!-- <ValidatorDetailsEvents /> -->
          </div>
        </div>
        <div class="mt-3">
          <!-- <ValidatorDetailsProposed /> -->
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
import ValidatorDetailsProposed from "./ValidatorDetailsProposed.vue";

import api from "Store/stake/api";

export default {
  name: "ValidatorsDetails",
  description: "Display the validator details",
  components: {
    ValidatorDetailsDelegated,
    ValidatorDetailsDelegators,
    ValidatorDetailsEvents,
    ValidatorDetailsHeader,
    ValidatorDetailsProposed
  },
  data() {
    return {
      isFetching: false,
      validator: null
    };
  },
  methods: {
    async getValidator(address) {
      this.isFetching = true;
      try {
        const response = await api.requestValidator(address);
        this.validator = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getValidator(this.$route.params.id);
  }
};
</script>
