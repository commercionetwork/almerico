<template>
  <v-card outlined>
    <v-card-text class="text-center">
      <v-btn
        color="primary"
        depressed
        :disabled="!isVotingPeriod"
        @click="openDialog"
      >
        <span class="px-5" v-text="voteButtonLabel" />
      </v-btn>
      <ProposalsViewDetailVotesVotingModal
        v-model="dialog"
        :proposal="proposal"
      />
      <i18n
        v-if="vote"
        class="ml-3 text-body-2"
        tag="span"
        path="msgs.youVoted"
      >
        <span class="font-weight-bold" v-text="vote" />
      </i18n>
    </v-card-text>
  </v-card>
</template>

<script>
import ProposalsViewDetailVotesVotingModal from './ProposalsViewDetailVotesVotingModal.vue';

import proposalDetailHelper from './helpers/proposalDetailHelper';
import { PROPOSALS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailVotesVoting',
  components: { ProposalsViewDetailVotesVotingModal },
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters('keplr', ['accounts']),
    ...mapGetters('proposals', ['proposal', 'votes']),
    isVotingPeriod() {
      return this.proposal.status === PROPOSALS.STATUS.VOTING_PERIOD;
    },
    vote() {
      let vote;
      if (this.accounts.length > 0 && this.votes.length > 0) {
        const voteIndex = this.votes.findIndex((vote) => {
          return vote.voter === this.accounts[0].address;
        });
        if (voteIndex > 0) {
          vote = this.votes[voteIndex];
        }
      }
      return proposalDetailHelper.getVoteLabel(vote);
    },
    voteButtonLabel() {
      return this.vote ? this.$t('labels.editVote') : this.$t('labels.vote');
    },
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
  },
};
</script>
