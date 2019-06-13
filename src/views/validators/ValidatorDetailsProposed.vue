<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex align-items-center">
        <div class="col-12 d-flex justify-content-start">
          <h2
            class="com-font-s16-w700"
            v-html="'Proposed blocks'"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s12-w700">
                  <th scope="col">Height</th>
                  <th scope="col">Block Hash</th>
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
                      :to="toBlockDetails(block.height)"
                      v-text="block.hash"
                      class="d-inline-block text-truncate com-font-s12-w400"
                      style="max-width: 120px;"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="block.transactions"
                  />
                  <td
                    class="align-middle"
                    v-text="block.time.toLocaleString()"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

//TODO: remove
import { mockBlocks } from "Store/blocks/__mocks__/blocksOld";

export default {
  name: "ValidatorDetailsProposed",
  description: "Display a blocks list",
  computed: {
    isFetching() {
      return false;
    },
    blocks() {
      return mockBlocks(5);
    }
  },
  methods: {
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
