<template>
  <div class="table-responsive">
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
        <ValidatorDetailsEventsTableRow
          v-for="(event, index) in events"
          :key="index"
          :event="event"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import ValidatorDetailsEventsTableRow from "./ValidatorDetailsEventsTableRow.vue";

export default {
  name: "ValidatorDetailsEventsTable",
  description: "Display the poewer events table of a validator",
  components: {
    ValidatorDetailsEventsTableRow
  },
  props: {
    events: {
      type: Array,
      required: true,
      note: "List of power event transactions"
    }
  }
};
</script>
