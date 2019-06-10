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
              v-for="block in blocks"
              :key="block.block_id.hash"
            >
              <td class="align-middle">
                <router-link
                  :to="toBlockDetails(block.header.height)"
                  v-text="block.header.height"
                />
              </td>
              <td class="align-middle">
                <router-link
                  class="d-inline-block text-truncate"
                  style="max-width: 120px;"
                  :to="toBlockDetails(block.header.height)"
                  v-text="block.block_id.hash"
                />
              </td>
              <td
                class="align-middle"
              >
                <router-link
                :to="toValidatorDetails(block.header.proposer_address)"
                v-text="block.header.proposer"
                />
              </td>
              <td
                class="align-middle"
                v-text="block.header.num_txs"
              />
              <td
                class="align-middle"
                v-text="getTime(block)"
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
    },
    isFetching: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTime(block) {
      let time = "";
      let seconds = (new Date() - new Date(block.header.time)) / 1000;
      switch (true) {
        case seconds >= 3600:
          time = `${(seconds / 3600).toFixed(0)}h`;
          break;
        case seconds >= 60:
          time = `${(seconds / 60).toFixed(0)}m`;
          break;
        default:
          time = `${seconds.toFixed(0)}s`;
      }

      return `${time} ago`;
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
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATORS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  },
};
</script>
