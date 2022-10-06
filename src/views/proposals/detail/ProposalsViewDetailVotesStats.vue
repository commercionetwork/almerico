<template>
  <v-card outlined>
    <v-card-title class="d-flex justify-center">
      <span
        class="text-h5 font-weight-bold"
        v-text="$t('titles.statisticsVotes')"
      />
    </v-card-title>
    <v-card-text>
      <ProposalsViewDetailVotesStatsData :stats="stats" />
    </v-card-text>
    <v-card-text>
      <ProposalsViewDetailVotesStatsChart :stats="stats" />
    </v-card-text>
  </v-card>
</template>

<script>
import ProposalsViewDetailVotesStatsChart from './ProposalsViewDetailVotesStatsChart.vue';
import ProposalsViewDetailVotesStatsData from './ProposalsViewDetailVotesStatsData.vue';

import proposalDetailHelper from './helpers/proposalDetailHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailVotesStats',
  components: {
    ProposalsViewDetailVotesStatsChart,
    ProposalsViewDetailVotesStatsData,
  },
  computed: {
    ...mapGetters('proposals', ['pool', 'tally', 'tallyParams']),
    stats() {
      return proposalDetailHelper.getStatsData(
        this.pool,
        this.tally,
        this.tallyParams
      );
    },
  },
};
</script>
