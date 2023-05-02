<template>
  <div>
    <div>
      <proposals-view-detail-votes-stats />
    </div>
    <div class="mt-3">
      <proposals-view-detail-votes-table />
    </div>
  </div>
</template>

<script>
import ProposalsViewDetailVotesStats from './ProposalsViewDetailVotesStats.vue';
import ProposalsViewDetailVotesTable from './ProposalsViewDetailVotesTable.vue';

export default {
  name: 'ProposalsViewDetailVotes',
  components: {
    ProposalsViewDetailVotesStats,
    ProposalsViewDetailVotesTable,
  },
};
</script>
