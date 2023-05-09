<template>
  <v-card outlined>
    <v-card-text>
      <v-data-table :headers="headers" :items="items" :items-per-page="5">
        <template #top>
          <div
            class="py-2 text-center text-overline font-weight-bold"
            v-text="$t('titles.votingDetail')"
          />
        </template>
        <template #[`item.voter`]="{ item }">
          <router-link
            class="text-decoration-none"
            :to="{
              name: ROUTES.NAME.ACCOUNT,
              params: { id: item.voter },
            }"
          >
            <span v-text="item.voter" />
          </router-link>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import proposalDetailHelper from './helpers/proposalDetailHelper';
import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailVotesTable',

  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    ...mapGetters('proposals', ['votes']),
    headers() {
      return [
        { text: this.$t('labels.address'), value: 'voter' },
        { text: this.$t('labels.vote'), value: 'option' },
      ];
    },
    items() {
      return this.votes.map((vote) => {
        return {
          voter: vote.voter,
          option: proposalDetailHelper.getVoteLabel(vote),
        };
      });
    },
  },
};
</script>
