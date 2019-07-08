<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.validators')" />
    <div class="container rounded bg-light">
      <div class="row py-3 px-5">
        <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
          <CellHeight />
        </div>
        <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
          <CellValidators />
        </div>
        <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
          <CellTokens />
        </div>
        <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
          <CellTime />
        </div>
      </div>
      <div class="row py-3 px-5 bg-white">
        <div class="col-12">
          <div class="row py-1 d-flex justify-content-between">
            <div class="col-12 col-md-8 offset-md-4">
              <SearchValidator v-on:filter-validators="filterValidators" />
            </div>
          </div>
          <div
            v-if="isFetching"
            v-text="$t('messages.loading')"
          />
          <div
            v-else
            class="table-responsive"
          >
            <TableValidators
              :pool="pool"
              :filteredValidators="filteredValidators"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellHeight from "./CellHeight.vue";
import CellTime from "./CellTime.vue";
import CellTokens from "./CellTokens.vue";
import CellValidators from "./CellValidators.vue";
import SectionHeader from "Components/common/SectionHeader.vue";
import SearchValidator from "./SearchValidator.vue";
import TableValidators from "./TableValidators.vue";

import { mapGetters } from "vuex";

export default {
  name: "Validators",
  description: "Container for validators' section",
  components: {
    CellHeight,
    CellTime,
    CellTokens,
    CellValidators,
    SectionHeader,
    SearchValidator,
    TableValidators
  },
  data() {
    return {
      activeFilter: true,
      queryFilter: "",
      filteredValidators: []
    };
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool",
      isFetchingStake: "isFetching"
    }),
    ...mapGetters("validators", {
      validators: "validators",
      isFetchingValidators: "isFetching"
    }),
    isFetching() {
      return (
        (this.isFetchingStake || this.isFetchingValidators) &&
        this.validators.length === 0
      );
    }
  },
  methods: {
    filterValidators(filter) {
      console.log("filter", filter)
    }
  },
  mounted(){
    this.filteredValidators = this.validators;
  }
};
</script>
