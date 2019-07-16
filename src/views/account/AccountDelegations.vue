<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          class="com-font-s16-w700"
          v-text="$t('titles.delegations')"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="delegations.length > 0"
          :limit="limit"
          :page="page"
          :total="total"
          v-on:change-page="changePage"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div
          v-if="delegations.length > 0"
          class="table-responsive"
        >
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th
                  scope="col"
                  v-text="$t('labels.validator')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.amount')"
                />
              </tr>
            </thead>
            <tbody>
              <AccountDelegationsRow
                v-for="(delegation, index) in delegationsPage"
                :key="index"
                :delegation="delegation"
              />
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="text-center com-font-s13-w700"
          v-text="$t('messages.noItems')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AccountDelegationsRow from "./AccountDelegationsRow.vue";
import Pagination from "Components/common/Pagination.vue";

export default {
  name: "AccountDelegations",
  description: "Display the account delegations list",
  components: {
    AccountDelegationsRow,
    Pagination
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "Delegations list"
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
      return this.delegations.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
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
