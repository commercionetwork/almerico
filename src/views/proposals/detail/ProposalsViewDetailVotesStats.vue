<template>
  <v-card outlined>
    <v-card-title class="d-flex justify-center">
      <span
        class="text-h5 font-weight-bold"
        v-text="$t('titles.statisticsVotes')"
      />
    </v-card-title>
    <v-card-text>
      <ProposalsViewDetailVotesStatsHeader :stats="stats" />
    </v-card-text>
    <v-card-text>
      <ProposalsViewDetailVotesStatsBody :stats="stats" />
    </v-card-text>
  </v-card>
</template>

<script>
import ProposalsViewDetailVotesStatsHeader from './ProposalsViewDetailVotesStatsHeader.vue';
import ProposalsViewDetailVotesStatsBody from './ProposalsViewDetailVotesStatsBody.vue';

import proposalDetailHelper from './helpers/proposalDetailHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailVotesStats',
  components: {
    ProposalsViewDetailVotesStatsHeader,
    ProposalsViewDetailVotesStatsBody,
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
