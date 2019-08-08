<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.validators')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div class="row rounded com-bg-header">
      <div class="col-12">
        <div class="row py-3 px-5">
          <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
            <CellHeight
              v-if="$config.validators.live_data.block_height"
              data-test="live-height"
            />
          </div>
          <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
            <CellValidators
              v-if="$config.validators.live_data.count"
              data-test="live-count"
            />
          </div>
          <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
            <CellTokens
              v-if="$config.validators.live_data.bonded_tokens"
              data-test="live-tokens"
            />
          </div>
          <div class="col-12 col-md-6 col-xl-3 my-1 my-md-0">
            <CellTime
              v-if="$config.validators.live_data.time_since_last_block"
              data-test="live-time"
            />
          </div>
        </div>
        <div class="row py-3 px-5 com-bg-body">
          <div class="col-12">
            <div class="row py-1 d-flex justify-content-between">
              <div class="col-12 col-md-8 offset-md-4">
                <SearchValidator v-on:filter-validators="filterValidators" />
              </div>
            </div>
            <div class="row py-1">
              <div class="col-12">
                <div
                  v-if="isFetching"
                  class="alert alert-warning"
                  role="alert"
                  v-text="$t('messages.loading')"
                  data-test="loading"
                />
                <TableValidators
                  v-else-if="!isFetching && filteredValidators.length > 0"
                  :validators="filteredValidators"
                  data-test="items"
                />
                <div
                  v-else
                  class="alert alert-info"
                  role="alert"
                  v-text="$t('messages.noItems')"
                  data-test="no-items"
                />
              </div>
            </div>
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
import SearchBar from "Components/common/SearchBar.vue";
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
    SearchBar,
    SearchValidator,
    TableValidators
  },
  data() {
    return {
      filter: {
        status: true,
        moniker: ""
      },
      filteredValidators: []
    };
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool"
    }),
    ...mapGetters("validators", {
      validators: "validators",
      isFetching: "isFetching"
    }),
    bonded() {
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    }
  },
  watch: {
    pool() {
      this.filterValidators(this.filter);
    }
  },
  methods: {
    filterValidators(filter) {
      const validators = [...this.validators];
      const statusFilteredValidators = filter.status
        ? validators.filter(validator => validator.status === 2)
        : validators.filter(validator => validator.status !== 2);
      let cumulative = 0;
      const orderedValidators = statusFilteredValidators
        .sort(function(a, b) {
          return b.tokens - a.tokens;
        })
        .map(validator => {
          cumulative += validator.tokens / this.bonded;
          validator.cumulative = cumulative;
          return validator;
        });
      this.filteredValidators = filter.moniker
        ? orderedValidators.filter(
            validator => validator.description.moniker === filter.moniker
          )
        : orderedValidators;
      this.filter = filter;
    }
  },
  mounted() {
    this.filterValidators(this.filter);
  }
};
</script>
