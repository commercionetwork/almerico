<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else></div>
  </div>
</template>

<script>
export default {
  name: "AccountHeader",
  description: "Display the account header data",
  props: {
    account: {
      type: Object,
      required: true,
      note: "Object representing a account"
    }
  },
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
