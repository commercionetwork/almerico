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
      <ValidatorDetailsHeader :validator="validator" />
      <ValidatorDetailsDelegated
        :validator="validator"
        class="mt-3"
      />
    </div>
  </div>
</template>

<script>
import ValidatorDetailsDelegated from "./ValidatorDetailsDelegated.vue";
import ValidatorDetailsHeader from "./ValidatorDetailsHeader.vue";

//TODO: remove
import { mockValidator } from "Store/validators/__mocks__/validators";

export default {
  name: "ValidatorsDetails",
  description: "Display the validator details",
  components: {
    ValidatorDetailsDelegated,
    ValidatorDetailsHeader
  },
  computed: {
    validator() {
      return mockValidator();
    },
    validatorPubKey() {
      return this.$route.params.id;
    }
  }
};
</script>
