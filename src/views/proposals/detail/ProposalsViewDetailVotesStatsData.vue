<template>
  <div>
    <div class="py-1 text-center text-body-1 font-weight-bold">
      <span v-text="$t('labels.turnout')" />
      <span class="ml-3" v-text="stats.turnout" />
    </div>
    <div class="py-1 text-center text-caption">
      <i18n tag="span" path="msgs.proposalMinimumStaked">
        <span v-text="stats.minimum.amount" />
        <span v-text="stats.minimum.percentage" />
      </i18n>
    </div>
    <v-row class="mt-1">
      <v-col cols="12" md="3" v-for="(vote, i) in stats.votes" :key="i">
        <v-alert outlined :color="colors[i]">
          <div
            class="py-2 text-caption font-weight-bold d-flex justify-center"
            v-text="vote.label"
          />
          <div class="text-center text-caption secondary--text">
            <div class="text-wrap">{{ vote.amount }}{{ ' COM' }}</div>
            <div v-text="vote.percentage" />
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </div>
</template>

<script>
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
};
</script>
