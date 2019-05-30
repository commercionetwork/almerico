<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      UNBONDINGS
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountUnbondings",
  description: "Display the account unbondings list",
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
