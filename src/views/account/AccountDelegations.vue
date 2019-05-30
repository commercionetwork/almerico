<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      DELEGATIONS
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountDelegations",
  description: "Display the account delegations list",
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
