<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-8 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="title"
        />
      </div>
      <div class="col-12 col-md-4 d-flex justify-content-start justify-content-md-end">
        &nbsp;
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div class="p-1 rounded-lg bg-light">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Header</h2>
          </div>
        </div>
        <hr>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Height</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ blockHeight }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Block time</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ block.time.toLocaleString() }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Block hash</div>
          <div class="col-12 col-md-9 text-break com-font-s13-w400">{{ block.hash }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Number of transactions</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ block.transactions }}</div>
        </div>
        <div class="row p-1">
          <div class="col-12 col-md-3 com-font-s13-w700">Proposer</div>
          <div class="col-12 col-md-9 com-font-s13-w400">{{ block.proposer }}</div>
        </div>
      </div>
      <div class="my-3 p-1 rounded-lg bg-light">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Transactions</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//TODO: remove
import { mockBlock } from "Store/blocks/__mocks__/blocks";

export default {
  name: "BlocksDetails",
  description: "Display the block details",
  computed: {
    block() {
      return mockBlock(1, new Date(), this.blockHeight);
    },
    blockHeight() {
      return this.$route.params.id;
    },
    title() {
      let label = this.$t('titles.detailsForBlock');
      let height = this.block.height;
      return `${label} #${height}`;
    }
  }
};
</script>
