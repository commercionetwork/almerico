<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.validators')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellHeight />
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellValidators />
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellTokens />
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellTime />
        </div>
      </div>
      <hr>
      <TableValidators
        :validators="validators"
        :isFetching="isFetching"
      />
    </div>
  </div>
</template>

<script>
import CellHeight from "./CellHeight.vue";
import CellTime from "./CellTime.vue";
import CellTokens from "./CellTokens.vue";
import CellValidators from "./CellValidators.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import TableValidators from "./TableValidators.vue";

import api from "Store/validators/api";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Validators",
  description: "Container for validators' section",
  components: {
    CellHeight,
    CellTime,
    CellTokens,
    CellValidators,
    SectionHeader,
    TableValidators
  },
  data() {
    return {
      loadingValidatorSets: false,
      validatorSets: []
    };
  },
  computed: {
    ...mapGetters("validators", {
      loadingValidators: "isFetching",
      allValidators: "allValidators"
    }),
    isFetching() {
      return this.loadingValidators || this.loadingValidatorSets;
    },
    validators() {
      return (this.allValidators.length > 0) & (this.validatorSets.length > 0)
        ? this.allValidators.map(validator => {
            validator.voting_power = this.validatorSets.find(
              x => x.consensus_pubkey === validator.pub_key
            ).voting_power;
            return validator;
          })
        : [];
    },
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  },
  methods: {
    ...mapActions("validators", {
      getValidators: "getValidators"
    }),
    async getValidatorSets() {
      this.loadingValidatorSets = true;
      try {
        const response = await api.requestValidatorsetsLatest();
        this.validatorSets = response.data.validators;
      } catch (error) {
        console.log("Get validator sets: ", error);
      } finally {
        this.loadingValidatorSets = false;
      }
    }
  },
  created() {
    this.getValidators({ limit: 10 });
    this.getValidatorSets();
  }
};
</script>
