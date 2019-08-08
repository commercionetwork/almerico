<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          class="py-3 com-font-s16-w700"
          v-text="$t('titles.unbondings')"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="delegations.length > 0"
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
        <AccountUnbondingsTable
          v-if="delegations.length > 0"
          :unbondings="delegationsPage"
          data-test="items"
        />
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
import AccountUnbondingsTable from "./AccountUnbondingsTable.vue";
import Pagination from "Components/common/Pagination.vue";

export default {
  name: "AccountUnbondings",
  description: "Display the account unbondings list",
  components: {
    AccountUnbondingsTable,
    Pagination
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "Unbonding delegations list"
    }
  },
  data() {
    return {
      limit: 5,
      page: 1
    };
  },
  computed: {
    delegationsPage() {
      const delegs = [];
      this.delegations.forEach(delegation => {
        delegation.entries.forEach(entry => {
          delegs.push({
            validator_address: delegation.validator_address,
            entry: entry
          });
        });
      });
      return delegs
        .sort(function(a, b) {
          return b.entry.creation_height - a.entry.creation_height;
        })
        .slice((this.page - 1) * this.limit, this.page * this.limit);
    },
    total() {
      return this.delegations.length;
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
