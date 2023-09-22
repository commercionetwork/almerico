<template>
  <div>
    <h1>AssetsViewDetailMarketing</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetailMarketing',
  computed: {
    ...mapGetters('assets', ['detail']),
  },
};
</script>
