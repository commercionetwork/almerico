<template>
  <tr class="text-center com-font-s13-w400">
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <router-link
        v-else
        :to="toDetails(ROUTE_NAMES.BLOCK_DETAILS, block.header.height)"
        v-text="block.header.height"
        data-test="item-height"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
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
        :to="toDetails(ROUTE_NAMES.VALIDATORS_DETAILS, proposerAddress)"
        v-text="proposer"
        data-test="item-proposer"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
        v-text="$t('messages.loading')"
        data-test="loading"
      />
      <span
        v-else
        v-text="block.header.num_txs"
        data-test="item-txs"
      />
    </td>
    <td class="align-middle">
      <span
        v-if="isFetching"
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
import { PREFIX, ROUTE_NAMES } from "Constants";
import { bech32Manager } from "Utils";
import { mapGetters } from "vuex";

export default {
  name: "CellBlocksRow",
  description: "Display a row of blocks cell",
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
    blockDate() {
      return new Date(this.block.header.time).toLocaleDateString();
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
    this.getProposer();
  }
};
</script>
