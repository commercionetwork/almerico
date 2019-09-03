<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr class="text-center com-font-s13-w700">
          <th
            scope="col"
            data-test="table-column-height"
          >
            <span v-text="$t('labels.voter')" />
          </th>
          <th
            scope="col"
            data-test="table-column-hash"
          >
            <span v-text="$t('labels.vote')" />
          </th>
        </tr>
      </thead>
      <tbody>
        <VotingDetailsVotesTableRow
          v-for="(vote, index) in votes"
          :key="index"
          :vote="vote"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import VotingDetailsVotesTableRow from "./VotingDetailsVotesTableRow.vue";
export default {
  name: "VotingDetailsVotesTable",
  description:"",
  components: {
    VotingDetailsVotesTableRow
  },
  props: {
    votes:{
      type: Array,
      required: true,
      note:""
    }
  }
};
</script>