<template>
  <TableCell
    :isFetching="isFetching"
    :link="link"
    :title="$t('titles.blocks')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
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
                  :to="toBlockDetails(block.height)"
                  v-text="block.header.height"
                />
              </td>
              <td class="align-middle">
                <router-link
                  class="d-inline-block text-truncate"
                  style="max-width: 120px;"
                  :to="toValidatorDetails(getProposer(block))"
                  v-text="getProposer(block)"
                />
              </td>
              <td
                class="align-middle"
                v-text="block.header.num_txs"
              />
              <td
                class="align-middle"
                v-text="getTime(block.header.time)"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </TableCell>
</template>

<script>
import TableCell from "Components/common/TableCell.vue";

import { PREFIX, ROUTE_NAMES } from "Constants";
import { bech32Manager, localizedRoute } from "Utils";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "CellBlocks",
  description: "Display the blocks table",
  components: {
    TableCell
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "allBlocks",
      isFetching: "isFetching"
    }),
    link() {
      return localizedRoute(ROUTE_NAMES.BLOCKS, this.$i18n.locale);
    }
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks"
    }),
    getProposer(block) {
      let address = bech32Manager.encode(
        block.header.proposer_address,
        PREFIX.COMNETVALOPER
      );
      return address;
    },
    getTime(date){
      return (new Date(date)).toLocaleString();
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
  created() {
    this.getBlocks(5);
  }
};
</script>
