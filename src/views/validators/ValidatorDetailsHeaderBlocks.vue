<template>
  <div class="grid">
    <div
      v-for="(verified, index) in verifiedBlocks"
      :key="index"
      :class="(verified.missing) ? 'missing' : ''"
      :title="verified.height"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { bech32Manager } from "Utils";

export default {
  name: "ValidatorDetailsHeaderBlocks",
  description: "Display the last 100 blocks",
  props: {
    validator: {
      type: Object,
      required: true,
      note: "Object representing a validator"
    }
  },
  computed: {
    ...mapGetters("blocks", {
      blocks: "blocks"
    }),
    ...mapGetters("validators", {
      validatorSet: "validatorSet"
    }),
    verifiedBlocks() {
      let blocks = [];
      let pubKey = this.validator.consensus_pubkey;

      let validatorIndex = this.validatorSet.findIndex(
        validator => validator.pub_key === pubKey
      );
      if (validatorIndex < 0) return blocks;

      let hex = bech32Manager.decode(this.validatorSet[validatorIndex].address);
      this.blocks.forEach(block => {
        let newItem = {
          height: block.header.height,
          missing: false
        };
        let signatures = block.last_commit.signatures;
        let signatureIndex = signatures.findIndex(function(signature) {
          return signature.validator_address === hex.toUpperCase();
        });
        if (signatureIndex < 0) {
          newItem.missing = true;
        }
        blocks.push(newItem);
      });
      return blocks;
    }
  }
};
</script>

<style lang="css" scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(1rem, 1fr));
  grid-auto-rows: 1fr;
}

.grid::before {
  content: "";
  width: 0;
  padding-bottom: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

.grid > *:first-child {
  grid-row: 1 / 1;
  grid-column: 1 / 1;
}

/* Just to make the grid visible */

.grid > * {
  background-color: #38ba8c;
  border: 1px white solid;
}

.missing {
  background-color: #cc3333;
}
</style>