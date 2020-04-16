<template>
  <div class="container com-container">
    <div
      v-if="$config.dashboard.chains.enabled"
      class="row py-1 d-flex align-items-center"
    >
      <div class="col-12 d-flex justify-content-start">
        <ChainChooser data-test="chain-chooser" />
      </div>
    </div>
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
    <div class="row rounded com-bg-header">
      <div class="col-12">
        <div
          v-if="$config.dashboard.graphs.enabled"
          class="row py-3 px-5"
        >
          <div
            v-if="$config.dashboard.graphs.price"
            class="col-12 col-lg-5 my-1 my-lg-0"
            data-test="graphs-price"
          >
            <CellPrice />
          </div>
          <div
            v-if="$config.dashboard.graphs.block_height"
            class="col-12 col-lg-2 my-1 my-lg-0"
            data-test="graphs-block-height"
          >
            <CellHeight />
          </div>
          <div
            v-if="$config.dashboard.graphs.bonded_tokens"
            class="col-12 col-lg-5 my-1 my-lg-0"
            data-test="graphs-bonded-tokens"
          >
            <CellBonded />
          </div>
        </div>
        <div
          v-if="$config.dashboard.live_data.enabled"
          class="row py-3 px-5 com-bg-body"
        >
          <div
            v-if="$config.dashboard.live_data.blocks"
            class="col-12 my-1 my-md-0"
            :class="{ 'col-md-6': $config.dashboard.live_data.transactions }"
            data-test="live-data-blocks"
          >
            <CellBlocks />
          </div>
          <div
            v-if="$config.dashboard.live_data.transactions"
            class="col-12 my-1 my-md-0"
            :class="{ 'col-md-6': $config.dashboard.live_data.blocks }"
            data-test="live-data-transactions"
          >
            <CellTransactions />
          </div>
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
import ChainChooser from "./ChainChooser.vue";
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
    ChainChooser,
    SearchBar
  }
};
</script>
