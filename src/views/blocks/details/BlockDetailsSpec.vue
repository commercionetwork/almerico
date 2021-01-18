<template>
  <v-card elevation="2" :loading="isLoading">
    <v-card-title v-text="height" />
    <v-card-subtitle v-text="'Height'" />
    <v-divider />
    <v-card-text>
      <div v-text="'Time'" />
      <div class="pb-1 font-weight-bold" v-text="time" />
      <div v-text="'Hash'" />
      <div class="pb-1 text-break text-overline" v-text="hash" />
      <div v-text="'Txs number'" />
      <div class="pb-1 font-weight-bold" v-text="txs" />
      <div v-text="'Proposer'" />
      <router-link
        class="text-decoration-none font-weight-bold"
        v-text="proposerName"
        :to="proposerLink"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { BlockProposerHandler } from '@/utils';

export default {
  name: 'BlockDetailsSpec',
  props: {
    height: {
      type: String,
      required: true,
      note: 'The block height',
    },
  },
  computed: {
    ...mapGetters('blocks', {
      block: 'details',
    }),
    ...mapGetters('validators', {
      error: 'error',
      isLoading: 'isLoading',
      validators: 'validators',
      validatorsSets: 'heightValidatorsSets',
    }),
    hash() {
      return this.block.header ? this.block.header.last_block_id.hash : '';
    },
    proposer() {
      return BlockProposerHandler.setError(this.error)
        .setBlock(this.block)
        .setValidators(this.validators)
        .setValidatorsSets(this.validatorsSets)
        .setValidatorConsensusPrefix(
          this.$config.generic.prefixes.validator.consensus.address
        )
        .get();
    },
    proposerLink() {
      return Object.keys(this.proposer).length > 0
        ? {
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: this.proposer.operator_address },
          }
        : {};
    },
    proposerName() {
      return Object.keys(this.proposer).length > 0
        ? this.proposer.description.moniker
        : '';
    },
    time() {
      return this.block.header
        ? new Date(this.block.header.time).toLocaleString()
        : '';
    },
    txs() {
      return this.block.data && this.block.data.txs
        ? this.block.data.txs.length
        : 0;
    },
  },
  methods: {
    ...mapActions('validators', {
      fetchValidatorsetsFromHeight: 'fetchValidatorsetsFromHeight',
    }),
  },
  created() {
    if (this.height !== '') this.fetchValidatorsetsFromHeight(this.height);
  },
};
</script>
