<template>
  <div>
    <h1>AssetsViewDetailTransfer</h1>
    <div>{{ id }}</div>
  </div>
</template>

<script>
export default {
  name: 'AssetsViewDetailTransfer',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>
