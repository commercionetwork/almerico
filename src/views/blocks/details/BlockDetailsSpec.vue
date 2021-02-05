<template>
  <v-card elevation="2" :loading="isLoading">
    <v-card-text>
      <v-list class="ma-1">
        <v-list-item-title
          class="word-break font-weight-bold"
          v-text="height"
        />
        <v-list-item-subtitle class="text-capitalize" v-text="'height'" />
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <div class="text-capitalize font-weight-bold" v-text="'time'" />
            <div v-text="time" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div class="text-capitalize font-weight-bold" v-text="'hash'" />
            <div class="text-break text-overline" v-text="hash" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div
              class="text-capitalize font-weight-bold"
              v-text="'txs number'"
            />
            <div v-text="txs" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <div class="text-capitalize font-weight-bold" v-text="'proposer'" />
            <router-link
              class="text-decoration-none"
              v-text="proposerName"
              :to="proposerLink"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
      details: 'details',
    }),
    ...mapGetters('validators', {
      error: 'error',
      isLoading: 'isLoading',
      validators: 'validators',
      validatorsSets: 'heightValidatorsSets',
    }),
    hash() {
      return this.details.block_id ? this.details.block_id.hash : '';
    },
    proposer() {
      return BlockProposerHandler.setError(this.error)
        .setBlock(this.details.block)
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
      return this.details.block.header
        ? new Date(this.details.block.header.time).toLocaleString()
        : '';
    },
    txs() {
      return this.details.block.data && this.details.block.data.txs
        ? this.details.block.data.txs.length
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
