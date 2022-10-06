<template>
  <div>
    <div><ProposalsViewDetailVotesVoting /></div>
    <div class="mt-3"><ProposalsViewDetailVotesStats /></div>
    <div class="mt-3"><ProposalsViewDetailVotesTable /></div>
  </div>
</template>

<script>
import ProposalsViewDetailVotesStats from './ProposalsViewDetailVotesStats.vue';
import ProposalsViewDetailVotesTable from './ProposalsViewDetailVotesTable.vue';
import ProposalsViewDetailVotesVoting from './ProposalsViewDetailVotesVoting.vue';

export default {
  name: 'ProposalsViewDetailVotes',
  components: {
    ProposalsViewDetailVotesStats,
    ProposalsViewDetailVotesTable,
    ProposalsViewDetailVotesVoting,
  },
};
</script>
