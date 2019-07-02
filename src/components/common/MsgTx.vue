<template>
  <div class="m-1 p-1 rounded bg-white border">
    <div class="row p-1">
      <div class="col-12">
        <h3
          class="text-secondary com-font-s16-w700"
          v-text="title"
        />
      </div>
    </div>
    <hr>
    <slot name="body" />
  </div>
</template>

<script>
export default {
  name: "MsgTx",
  description: "Container for a transaction message",
  props: {
    title: {
      type: String,
      default: () => this.$t("titles.notManagedType"),
      note: "The transaction type"
    }
  }
};
</script>
