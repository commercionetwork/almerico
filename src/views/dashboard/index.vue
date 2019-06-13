<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.dashboard')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control com-font-s14-w400"
            :placeholder="$t('messages.search')"
            aria-label="Search"
            aria-describedby="search-field"
          >
          <div class="input-group-append">
            <span
              class="input-group-text bg-light com-pointer"
              id="search-field"
            >
              <Icon
                name="search"
                scale="1"
                class="text-primary"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div class="row py-3">
        <div class="col-12 col-lg-4 my-1 my-lg-0">
          <CellPrice />
        </div>
        <div class="col-12 col-lg-4 my-1 my-lg-0">
          <CellHeight />
        </div>
        <div class="col-12 col-lg-4 my-1 my-lg-0">
          <CellBonded />
        </div>
      </div>
      <div class="row py-3">
        <div class="col-12 col-md-6 my-1 my-md-0">
          <CellBlocks />
        </div>
        <div class="col-12 col-md-6 my-1 my-md-0">
          <CellTransactions />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CellBlocks from "./CellBlocks.vue";
import CellBonded from "./CellBonded.vue";
import CellHeight from "./CellHeight.vue";
import CellPrice from "./CellPrice.vue";
import CellTransactions from "./CellTransactions.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/search";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  description: "Container for dashboard's section",
  components: {
    CellBlocks,
    CellBonded,
    CellHeight,
    CellPrice,
    CellTransactions,
    Icon
  },
  computed: {
    ...mapGetters("stake", {
      validators: "validators"
    })
  },
  methods: {
    ...mapActions("stake", {
      getValidators: "getValidators"
    })
  },
  created() {
    if (this.validators.length === 0) this.getValidators({});
  }
};
</script>
