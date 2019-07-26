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
        <SearchBar />
      </div>
    </div>
    <div class="row rounded bg-light">
      <div class="col-12">
        <div class="row py-3 px-5">
          <div class="col-12 col-lg-5 my-1 my-lg-0">
            <CellPrice
              v-if="$config.dashboard.graphs.price"
              data-test="graphs-price"
            />
          </div>
          <div class="col-12 col-lg-2 my-1 my-lg-0">
            <CellHeight
              v-if="$config.dashboard.graphs.block_height"
              data-test="graphs-block-height"
            />
          </div>
          <div class="col-12 col-lg-5 my-1 my-lg-0">
            <CellBonded
              v-if="$config.dashboard.graphs.bonded_tokens"
              data-test="graphs-bonded-tokens"
            />
          </div>
        </div>
        <div class="row py-3 px-5 bg-white">
          <div class="col-12 col-md-6 my-1 my-md-0">
            <CellBlocks
              v-if="$config.dashboard.live_data.blocks"
              data-test="live-data-blocks"
            />
          </div>
          <div class="col-12 col-md-6 my-1 my-md-0">
            <CellTransactions
              v-if="$config.dashboard.live_data.transactions"
              data-test="live-data-transactions"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Config from "Assets/json/config.json";

import CellBlocks from "./CellBlocks.vue";
import CellBonded from "./CellBonded.vue";
import CellHeight from "./CellHeight.vue";
import CellPrice from "./CellPrice.vue";
import CellTransactions from "./CellTransactions.vue";
import SearchBar from "Components/common/SearchBar.vue";

export default {
  name: "Dashboard",
  description: "Container for dashboard's section",
  components: {
    CellBlocks,
    CellBonded,
    CellHeight,
    CellPrice,
    CellTransactions,
    SearchBar
  }
};
</script>
