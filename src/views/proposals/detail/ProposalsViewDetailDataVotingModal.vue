<template>
  <v-dialog v-model="show" max-width="500">
    <v-card :loading="isLoading">
      <v-toolbar flat>
        <v-toolbar-title>
          <span
            class="text-h6 font-weight-bold"
            v-text="proposal.content.title"
          />
        </v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn icon color="grey" dark @click="show = false">
            <v-icon>{{ mdiClose }}</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-actions class="ml-5">
        <v-radio-group v-model="voteOption">
          <v-radio
            v-for="option in voteOptions"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          />
        </v-radio-group>
      </v-card-actions>
      <v-card-actions class="pa-3 d-flex justify-end">
        <v-btn
          :disabled="!voteOption"
          color="primary"
          outlined
          @click="confirm"
        >
          <span v-text="$t('labels.confirm')" />
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { PROPOSALS } from '@/constants';
import { mdiClose } from '@mdi/js';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailDataVotingModal',
  props: {
    value: Boolean,
    proposal: Object,
  },
  emits: [`input`],
  data() {
    return {
      mdiClose,
      voteOption: null,
    };
  },
  computed: {
    ...mapGetters('proposals', ['isLoading']),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    voteOptions() {
      return PROPOSALS.VOTE_OPTIONS;
    },
  },
  methods: {
    ...mapActions('proposals', ['initProposalsDetail', 'voteProposal']),
    async confirm() {
      await this.voteProposal({
        voteOption: this.voteOption,
        proposalId: this.proposal.proposal_id,
        translator: this.$t,
        context: this,
      });
      this.show = false;
      await this.initProposalsDetail(this.proposal.proposal_id);
    },
  },
};
</script>
