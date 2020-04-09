<template>
  <tr class="text-center com-font-s13-w400">
    <td
      v-if="$config.blocks.table.columns.height"
      class="align-middle"
      data-test="table-column-height"
    >
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <router-link
        v-else
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, block.header.height)"
        v-text="blockHeight"
        data-test="item-height"
      />
    </td>
    <td
      v-if="$config.blocks.table.columns.hash"
      class="align-middle"
      data-test="table-column-hash"
    >
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <router-link
        v-else
        class="d-inline-block text-truncate"
        style="max-width: 120px;"
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, blockHeight)"
        v-text="blockHash"
        data-test="item-hash"
      />
    </td>
    <td
      v-if="$config.blocks.table.columns.proposer"
      class="align-middle"
      data-test="table-column-proposer"
    >
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <span
        v-else-if="!isFetching && hasError"
        class="text-danger"
        v-text="$t('messages.fetchingError')"
        data-test="has-error"
      />
      <router-link
        v-else
        :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, blockValidator)"
        v-text="blockMoniker"
        data-test="item-proposer"
      />
    </td>
    <td
      v-if="$config.blocks.table.columns.txs"
      class="align-middle"
      data-test="table-column-txs"
    >
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <span
        v-else
        v-text="blockTxs"
        data-test="item-txs"
      />
    </td>
    <td
      v-if="$config.blocks.table.columns.date"
      class="align-middle"
      data-test="table-column-date"
    >
      <span
        v-if="isFetching"
        class="text-info"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <span
        v-else
        v-text="blockDate"
        data-test="item-date"
      />
    </td>
  </tr>
</template>

<script>
import api from "Store/validators/api";
import { ROUTE_NAMES } from "Constants";
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
    },
    rank: {
      type: Number,
      required: true,
      note: "Block index inside list"
    }
  },
  data() {
    return {
      ROUTE_NAMES,
      hasError: false,
      isFetching: false,
      proposer: null
    };
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators"
    }),
    blockDate() {
      return new Date(this.block.header.time).toLocaleDateString() || "-";
    },
    blockHash() {
      return this.block.last_commit.block_id.hash || "-";
    },
    blockHeight() {
      return this.block.header.height || "-";
    },
    blockMoniker() {
      return this.proposer ? this.proposer.description.moniker : "-";
    },
    blockTxs() {
      let txs = "0";
      if (this.block.header && this.block.header.num_txs) {
        txs = this.block.header.num_txs;
      }
      if (
        this.block.data &&
        this.block.data.txs &&
        this.block.data.txs.length > 0
      ) {
        txs = this.block.data.txs.length.toString();
      }

      return txs;
    },
    blockValidator() {
      return this.proposer ? this.proposer.operator_address : "";
    }
  },
  watch: {
    block(value) {
      let isFetching = this.rank === 0 ? true : false;
      this.getProposer(value, isFetching);
    }
  },
  methods: {
    async getProposer(block, isFetching) {
      this.isFetching = isFetching;
      let address = bech32Manager.encode(
        block.header.proposer_address,
        this.$config.generic.prefixes.validator.consensus.address
      );
      try {
        const response = await api.requestValidatorsetsFromHeight(
          block.header.height
        );
        let pubKey = response.data.result.validators.find(
          x => x.address === address
        ).pub_key;
        this.proposer = this.validators.find(
          x => x.consensus_pubkey === pubKey
        );
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
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
    this.getProposer(this.block, true);
  }
};
</script>
