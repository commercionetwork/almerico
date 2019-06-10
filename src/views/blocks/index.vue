<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.blocks')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <TableBlocks
        :blocks="blocks"
        :isFetching="isFetching"
      />
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TableBlocks from "./TableBlocks.vue";

import api from "Store/validators/api";
import { PREFIX } from "Constants";
import { bech32Manager } from "Utils";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    SectionHeader,
    TableBlocks
  },
  data() {
    return {
      blocksWithProposer: [],
      loadingProposers: false
    };
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "allBlocks",
      isFetchingBlocks: "isFetching"
    }),
    ...mapGetters("validators", {
      validators: "allValidators"
    }),
    isFetching() {
      return this.isFetchingBlocks || this.loadingProposers;
    },
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  },
  methods: {
    ...mapActions("blocks", {
      getBlocks: "getBlocks"
    }),
    ...mapActions("validators", {
      getValidators: "getValidators"
    }),
    setProposers() {
      this.loadingProposers = true;
      let validators =
        this.validators.length === 0 ? this.getValidators({}) : this.validators;

      this.blocksWithProposer = this.blocks.map(async block => {
        let address = bech32Manager.encode(
          block.header.proposer_address,
          PREFIX.COMNETVALCONS
        );
        try {
          const response = await api.requestValidatorsetsFromHeight(
            block.header.height
          );
          let pubKey = response.data.validators.find(x => x.address === address)
            .pub_key;
          let proposer = validators.find(x => x.consensus_pubkey === pubKey);
          block.header.proposer = proposer.description.moniker;
          block.header.proposer_address = proposer.operator_address;
        } catch (error) {
          console.log("Get validator sets: ", error);
        }
        return block;
      });
      this.loadingProposers = false;
    }
  },
  created() {
    if (this.blocks.length === 0) {
      this.getBlocks(9);
    } else {
      this.setProposers();
    }
  }
};
</script>
