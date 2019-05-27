<template>
  <div class="p-1 h-100 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="table-responsive">
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
            <tr
              class="text-center com-font-s12-w400"
              v-for="block in blocks.slice().reverse()"
              :key="block.id"
            >
              <td class="align-middle">
                <router-link
                  :to="toBlockDetails(block.height)"
                  v-text="block.height"
                />
              </td>
              <td class="align-middle">
                <router-link
                  class="d-inline-block text-truncate com-font-s10-w400"
                  style="max-width: 120px;"
                  :to="toTransactionDetails(block.hash)"
                  v-text="block.hash"
                />
              </td>
              <!-- <td
                class="d-inline-block text-truncate com-font-s10-w400"
                style="max-width: 120px;"
                v-text="block.hash"
              /> -->
              <td
                class="align-middle"
                v-text="block.proposer"
              />
              <td
                class="align-middle"
                v-text="block.transactions"
              />
              <td
                class="align-middle"
                v-text="getSeconds(block.time)"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "TableBlocks",
  description: "Display the blocks list",
  props: {
    blocks: {
      type: Array,
      required: true,
      note: "The blocks list to dipslay"
    }
  },
  computed: {
    isFetching() {
      return false;
    }
  },
  methods: {
    getSeconds(time) {
      let seconds = ((new Date() - time) / 1000).toFixed(0);
      return `${seconds}s ago`;
    },
    toBlockDetails(id) {
      return {
        name: ROUTE_NAMES.BLOCKS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    },
    toTransactionDetails(id) {
      return {
        name: ROUTE_NAMES.TRANSACTIONS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
