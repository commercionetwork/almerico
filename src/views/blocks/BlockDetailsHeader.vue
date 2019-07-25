<template>
  <div class="p-3">
    <div
      v-if="Config.block_details.rows.height"
      class="row py-1"
      data-test="row-height"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.height')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="blockHeight"
      />
    </div>
    <div
      v-if="Config.block_details.rows.date"
      class="row py-1"
      data-test="row-date"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.date')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="blockTime"
      />
    </div>
    <div
      v-if="Config.block_details.rows.hash"
      class="row py-1"
      data-test="row-hash"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.hash')"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="blockHash"
      />
    </div>
    <div
      v-if="Config.block_details.rows.txs_number"
      class="row py-1"
      data-test="row-txs-number"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.txsNumber')"
      />
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="blockTransactions"
      />
    </div>
    <div
      v-if="Config.block_details.rows.proposing_node"
      class="row py-1"
      data-test="row-proposing-node"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="$t('labels.proposer')"
      />
      <div class="col-12 col-md-9 com-font-s14-w400">
        <div
          v-if="isFetching"
          v-text="$t('messages.loading')"
          data-test="loading"
        />
        <div
          v-else-if="!isFetching && hasError"
          class="text-danger"
          v-text="$t('messages.fetchingError')"
          data-test="has-error"
        />
        <router-link
          v-else
          :to="toDetails(ROUTE_NAMES.VALIDATOR_DETAILS, proposerAddress)"
          v-text="proposer"
          data-test="item"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Config from "Assets/json/config.json";

import api from "Store/validators/api";
import { PREFIX, ROUTE_NAMES } from "Constants";
import { bech32Manager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "BlockDetailsHeader",
  description: "Display the header of block details",
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
      Config,
      hasError: false,
      isFetching: false,
      proposer: "",
      proposerAddress: ""
    };
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators"
    }),
    blockHash() {
      return this.block.header ? this.block.header.last_block_id.hash : "";
    },
    blockHeight() {
      return this.block.header ? this.block.header.height : "";
    },
    blockTime() {
      return this.block.header
        ? new Date(this.block.header.time).toLocaleString()
        : "";
    },
    blockTransactions() {
      return this.block.header ? this.block.header.num_txs : "";
    }
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
    if (this.block.header) this.getProposer();
  }
};
</script>
