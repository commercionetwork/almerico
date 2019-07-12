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
                <th scope="col">Height</th>
                <th scope="col">TxHash</th>
                <th scope="col">Amount</th>
                <th scope="col">Time</th>
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
      </div>
    </div>
  </div>
</template>

<script>
import ValidatorDetailsEventsRow from "./ValidatorDetailsEventsRow.vue";

export default {
  name: "ValidatorDetailsEvents",
  description: "Display an events list",
  components: {
    ValidatorDetailsEventsRow
  },
  props: {
    events: {
      type: Array,
      required: true,
      note: "List of power event transactions"
    }
  },
  computed: {
    orderedEvents() {
      const events = [...this.events];
      return events.sort(function(a, b) {
        return b.height - a.height;
      });
    }
  }
};
</script>
