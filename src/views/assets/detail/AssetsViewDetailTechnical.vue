<template>
  <div>
    <h1>AssetsViewDetailTechnical</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetailTechnical',
  computed: {
    ...mapGetters('assets', ['detail']),
  },
};
</script>
