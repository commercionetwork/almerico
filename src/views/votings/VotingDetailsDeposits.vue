<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          v-text="$t('titles.deposits')"
          class="py-3 com-font-s16-w700"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="deposits.length > 0"
          :limit="limit"
          :page="page"
          :total="total"
          v-on:change-page="changePage"
          data-test="pagination"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div
          v-if="isFetching"
          class="alert alert-warning"
          role="alert"
          v-text="$t('messages.loading')"
          data-test="loading"
        />
        <div
          v-else-if="!isFetching && hasError"
          class="alert alert-danger"
          role="alert"
          v-text="$t('messages.fetchingError')"
          data-test="has-error"
        />
        <div
          v-else-if="!isFetching && !hasError && deposits.length > 0"
          data-test="items"
        >
          <VotingDetailsDepositsTable :deposits="depositsPage" />
        </div>
        <div
          v-else
          class="alert alert-info"
          role="alert"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import VotingDetailsDepositsTable from "./VotingDetailsDepositsTable";

import api from "Store/votings/api";

export default {
  name: "VotingDetailsDeposits",
  description: "Diplay the deposits list",
  components: {
    Pagination,
    VotingDetailsDepositsTable
  },
  props: {
    votingId: {
      type: String,
      required: true,
      note: "Voting id"
    }
  },
  data() {
    return {
      hasError: false,
      isFetching: false,
      limit: 5,
      page: 1,
      deposits: []
    };
  },
  computed: {
    total() {
      return this.deposits.length;
    },
    depositsPage() {
      return this.deposits.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    async getDeposits(id) {
      this.isFetching = true;
      try {
        const response = await api.requestDeposits(id);
        this.deposits = response.data.result;
      } catch (error) {
        this.hasError = true;
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.getDeposits(this.votingId);
  }
};
</script>