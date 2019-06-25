<template>
  <div class="border-bottom">
    <div
      v-for="(value, index) in values"
      :key="index"
      class="row p-1"
    >
      <div
        class="col-12 col-md-3 com-font-s14-w700"
        v-text="value[0]"
      />
      <div
        class="col-12 col-md-9 text-break com-font-s14-w400"
        v-text="value[1]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionsDetailsMsg",
  description: "Display the transaction's message",
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing the messages to display"
    }
  },
  computed: {
    values() {
      let value = this.message.value;
      return Object.keys(value).map(key => {
        return [key, value[key]];
      });
    }
  }
};
</script>
