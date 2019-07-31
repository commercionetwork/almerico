<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          v-text="$t('titles.powerEvents')"
          class="py-3 com-font-s16-w700"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="events.length > 0"
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
        <ValidatorDetailsEventsTable
          v-if="orderedEvents.length > 0"
          :events="orderedEvents"
          data-test="items"
        />
        <div
          v-else
          class="py-1 text-center text-info border-top com-font-s14-w700"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import ValidatorDetailsEventsTable from "./ValidatorDetailsEventsTable.vue";

export default {
  name: "ValidatorDetailsEvents",
  description: "Display an events list",
  components: {
    Pagination,
    ValidatorDetailsEventsTable
  },
  props: {
    events: {
      type: Array,
      required: true,
      note: "List of power event transactions"
    }
  },
  data() {
    return {
      limit: 5,
      page: 1
    };
  },
  computed: {
    orderedEvents() {
      const events = [...this.events];
      events.sort(function(a, b) {
        return b.height - a.height;
      });
      return events.slice((this.page - 1) * this.limit, this.page * this.limit);
    },
    total() {
      return this.events.length;
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
