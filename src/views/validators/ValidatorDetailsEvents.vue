<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h2
          v-text="$t('titles.powerEvents')"
          class="com-font-s16-w700"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th
                  scope="col"
                  v-text="$t('labels.height')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.hash')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.amount')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.date')"
                />
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
        <Pagination
          :limit="limit"
          :page="page"
          :total="events.length"
          v-on:change-page="changePage"
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
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
