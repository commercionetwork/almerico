<template>
  <div>
    <transition name="route">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TransactionsRouter',
};
</script>
