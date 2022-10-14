<template>
  <div>
    <div
      v-if="isVotingPeriod"
      class="py-1 text-center text-body-1 font-weight-bold"
    >
      <span v-text="$t('labels.turnout')" />
      <span class="ml-3" v-text="stats.turnout" />
    </div>
    <div v-if="isVotingPeriod" class="py-1 text-center text-caption">
      <i18n tag="span" path="msgs.proposalMinimumStaked">
        <span v-text="stats.minimum.amount" />
        <span v-text="stats.minimum.percentage" />
      </i18n>
    </div>
  </div>
</template>

<script>
import { PROPOSALS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailVotesStatsHeader',
  props: {
    stats: {
      type: Object,
      required: true,
      note: 'The data to show',
    },
  },
  computed: {
    ...mapGetters('proposals', ['proposal']),
    isVotingPeriod() {
      return this.proposal.status === PROPOSALS.STATUS.VOTING_PERIOD;
    },
  },
};
</script>
