<template>
  <div>
    <div><ProposalsViewDetailVotesStats /></div>
    <div class="mt-3"><ProposalsViewDetailVotesTable /></div>
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
