<template>
  <v-row>
    <v-col cols="12" lg="6" v-for="(vote, i) in stats.votes" :key="i">
      <v-alert outlined>
        <div
          class="py-2 text-caption text-uppercase font-weight-bold d-flex justify-center"
          :style="{ color: colors[i] }"
          v-text="vote.label"
        />
        <div class="text-center text-caption secondary--text">
          <div class="text-wrap">{{ vote.amount }}{{ ' COM' }}</div>
          <div v-text="vote.percentage" />
        </div>
      </v-alert>
    </v-col>
  </v-row>
</template>

<script>
import { PROPOSALS } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailVotesStatsData',
  props: {
    stats: {
      type: Object,
      required: true,
      note: 'The data to show',
    },
  },
  data() {
    return {
      colors: {
        yes: '#689f38',
        abstain: '#0097a7',
        no: '#ffa000',
        no_with_veto: '#c2185b',
      },
    };
  },
  computed: {
    ...mapGetters('proposals', ['proposal']),
    isVotingPeriod() {
      return this.proposal.status === PROPOSALS.STATUS.VOTING_PERIOD;
    },
  },
};
</script>
