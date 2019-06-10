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
                v-text="getProposer(block)"
              />
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
import api from "Store/validators/api";
import { PREFIX, ROUTE_NAMES } from "Constants";
import { bech32Manager } from "Utils";
import { mapActions, mapGetters } from "vuex";

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
    async getProposer(block) {
      let address = bech32Manager.encode(
        block.header.proposer_address,
        PREFIX.COMNETVALCONS
      );
      let name = "proposer name";
      try {
        const response = await api.requestValidatorsetsFromHeight(
          block.header.height
        );
        let pubKey = response.data.validators.find(x => x.address === address)
          .pub_key;
        let validators =
          this.validators.length === 0
            ? this.getValidators({})
            : this.validators;
        let proposer = validators.find(x => x.consensus_pubkey === pubKey);
        if (proposer) {
          name = proposer.description.moniker;
        }
      } catch (error) {
        console.log("Get validator sets: ", error);
      }
      return name;
    },
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
  }
};
</script>
