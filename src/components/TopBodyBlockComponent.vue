<template>
  <v-card outlined>
    <v-card-title class="justify-center text-h4">
      <router-link
        class="text-decoration-none font-weight-bold"
        v-text="blockHeight"
        :to="blockLink"
      />
    </v-card-title>
    <v-card-subtitle
      class="text-center text-capitalize text-subtitle-2"
      v-text="'latest height'"
    />
    <v-card-text class="text-center">
      <span class="d-block font-weight-bold" v-text="time" />
      <span class="d-block">
        Msgs/Txs:
        <span class="font-weight-bold">{{ msgs }}/{{ txs }} </span>
      </span>
      <span class="d-block">
        Proposer:
        <router-link
          class="text-decoration-none font-weight-bold"
          v-text="proposerName"
          :to="proposerLink"
        />
      </span>
      <span class="d-block">
        Validators:
        <span class="font-weight-bold">
          {{ validatorsTotal }} (bonded {{ validatorsBondeds }})
        </span>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import { proposerHandler } from "@/utils";
import { ROUTES } from "@/constants";

export default {
  name: "TopBodyBlockComponent",
  computed: {
    ...mapGetters("blocks", {
      block: "latest"
    }),
    ...mapGetters("transactions", {
      transactions: "transactions"
    }),
    ...mapGetters("validators", {
      validators: "validators",
      validatorsSet: "latestValidatorsSets"
    }),
    blockLink() {
      return this.blockHeight
        ? {
            name: ROUTES.NAMES.BLOCKS_DETAILS,
            params: { id: this.blockHeight }
          }
        : {};
    },
    blockHeight() {
      return this.block.header.height || "-";
    },
    blockProposerAddress() {
      return this.block.header.proposer_address || "-";
    },
    msgs() {
      let txs = this.transactions.filter(
        tx => tx.height === this.block.header.height
      );
      return txs.reduce((acc, item) => acc + item.tx.value.msg.length, 0);
    },
    proposer() {
      return proposerHandler.getFromValidatorsSet({
        address: this.blockProposerAddress,
        prefix: this.$config.generic.prefixes.validator.consensus.address,
        validatorsSet: this.validatorsSet,
        validators: this.validators
      });
    },
    proposerLink() {
      return this.proposer
        ? {
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: this.proposer.operator_address }
          }
        : {};
    },
    proposerName() {
      return this.proposer ? this.proposer.description.moniker : "-";
    },
    time() {
      return new Date(this.block.header.time).toLocaleString() || "-";
    },
    txs() {
      return this.block.data && this.block.data.txs
        ? this.block.data.txs.length
        : 0;
    },
    validatorsBondeds() {
      return this.validators.filter(validator => validator.status === 2).length;
    },
    validatorsTotal() {
      return this.validators.length;
    }
  }
};
</script>
