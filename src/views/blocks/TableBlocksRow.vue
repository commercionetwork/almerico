<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <router-link
        v-else
        :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, block.header.height)"
        v-text="block.header.height"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <router-link
        v-else
        class="d-inline-block text-truncate"
        style="max-width: 120px;"
        :to="toDetails(ROUTE_NAMES.BLOCKS_DETAILS, block.header.height)"
        v-text="block.last_commit.block_id.hash"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <router-link
        v-else
        :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, proposerAddress)"
        v-text="proposer"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <span
        v-else
        v-text="block.header.num_txs"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
      />
      <span
        v-else
        v-text="getTime(block)"
      />
    </td>
  </tr>
</template>

<script>
import api from "Store/tendermint/api";
import { PREFIX, ROUTE_NAMES } from "Constants";
import { bech32Manager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "TableBlocksRow",
  description: "Display a row of blocks table",
  props: {
    block: {
      type: Object,
      required: true,
      note: "Object representing a block"
    }
  },
  data() {
    return {
      ROUTE_NAMES,
      isFetching: false,
      proposer: "",
      proposerAddress: ""
    };
  },
  computed: {
    ...mapGetters("stake", {
      validators: "validators"
    })
  },
  methods: {
    async getProposer() {
      this.isFetching = true;
      let address = bech32Manager.encode(
        this.block.header.proposer_address,
        PREFIX.COMNETVALCONS
      );
      try {
        const response = await api.requestValidatorsetsFromHeight(
          this.block.header.height
        );
        let pubKey = response.data.validators.find(x => x.address === address)
          .pub_key;
        let proposer = this.validators.find(x => x.consensus_pubkey === pubKey);
        this.proposer = proposer
          ? proposer.description.moniker
          : "proposer name";
        this.proposerAddress = proposer ? proposer.operator_address : "";
      } catch (error) {
        console.log("Get validator sets: ", error);
      } finally {
        this.isFetching = false;
      }
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
    toDetails(name, id) {
      return {
        name,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  },
  created() {
    this.getProposer();
  }
};
</script>
