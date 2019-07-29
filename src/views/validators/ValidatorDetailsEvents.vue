<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          v-text="$t('titles.powerEvents')"
          class="com-font-s16-w700"
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
        <div
          v-if="events.length > 0"
          class="table-responsive"
          data-test="items"
        >
          <table class="table">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th scope="col">
                  <span v-text="$t('labels.height')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.hash')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.amount')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.date')" />
                </th>
              </tr>
            </thead>
            <tbody>
              <ValidatorDetailsEventsRow
                v-for="(event, index) in orderedEvents"
                :key="index"
                :event="event"
              />
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="text-center text-info com-font-s14-w700"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import ValidatorDetailsEventsRow from "./ValidatorDetailsEventsRow.vue";

export default {
  name: "ValidatorDetailsEvents",
  description: "Display an events list",
  components: {
    Pagination,
    ValidatorDetailsEventsRow
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
