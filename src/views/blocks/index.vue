<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.blocks')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <div
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <div
        v-else
        class="table-responsive"
      >
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
              <th scope="col">Block Hash</th>
              <th scope="col">Proposer</th>
              <th scope="col">Txs</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <TableBlocksRow
              v-for="block in blocks"
              :key="block.block_id.hash"
              :block="block"
            />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TableBlocksRow from "./TableBlocksRow.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    SectionHeader,
    TableBlocksRow
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "allBlocks",
      isFetchingBlocks: "isFetching"
    }),
    ...mapGetters("validators", {
      validators: "allValidators",
      isFetchingValidators: "isFetching"
    }),
    isFetching() {
      return this.isFetchingBlocks || this.isFetchingValidators;
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
    ...mapActions("blocks", {
      getBlocks: "getBlocks"
    }),
    ...mapActions("validators", {
      getValidators: "getValidators"
    })
  },
  created() {
    this.getBlocks(9);
    if (this.validators.length === 0) this.getValidators({});
  },
};
</script>
