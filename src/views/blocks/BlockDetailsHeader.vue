<template>
  <div class="p-1 rounded-lg bg-light">
    <div class="row p-1">
      <div class="col-12">
        <h2 class="com-font-s16-w700">Header</h2>
      </div>
    </div>
    <hr>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Height</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="blockHeight"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Block time</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="blockTime"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Block hash</div>
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="blockHash"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Number of transactions</div>
      <div
        class="col-12 col-md-9 com-font-s14-w400"
        v-text="blockTransactions"
      />
    </div>
    <div class="row p-1">
      <div class="col-12 col-md-3 com-font-s14-w700">Proposer</div>
      <div class="col-12 col-md-9 com-font-s14-w400">
        <div
          v-if="isFetching"
          v-text="$t('messages.loading')"
        />
        <router-link
          v-else
          :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, proposerAddress)"
          v-text="proposer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "Store/tendermint/api";
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
        console.log("Get validator sets: ", error);
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
