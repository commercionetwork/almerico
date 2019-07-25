<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1 d-flex align-items-center">
        <div class="col-12">
          <h2
            class="com-font-s16-w700"
            v-text="$t('titles.votes')"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th scope="col">Voter</th>
                  <th scope="col">Answer</th>
                  <th scope="col">TxHash</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center com-font-s13-w400"
                  v-for="vote in votes.slice().reverse()"
                  :key="vote.id"
                >
                  <td class="align-middle">
                    <router-link
                      :to="toAccountDetails(vote.voter.address)"
                      v-text="vote.voter.name"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="vote.answer"
                  />
                  <td class="align-middle">
                    <router-link
                      :to="toTransactionDetails(vote.tx_hash)"
                      v-text="vote.tx_hash"
                      class="d-inline-block text-truncate"
                      style="max-width: 120px;"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="vote.date.toLocaleString()"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

//TODO: remove
import { mockVotes } from "Store/votings/__mocks__/proposals";

export default {
  name: "VotingDetailsVotesList",
  description: "Diplay the votes list",
  computed: {
    isFetching() {
      return false;
    },
    votes() {
      return mockVotes(5);
    }
  },
  methods: {
    toAccountDetails(id) {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    },
    toTransactionDetails(id) {
      return {
        name: ROUTE_NAMES.TRANSACTION_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
