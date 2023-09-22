<template>
  <div>AssetsViewDetail</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetail',
  computed: {
    ...mapGetters('assets', ['error', 'isLoading']),
  },
  created() {
    this.initAssetsDetail(this.$route.params.id);
  },
  methods: {
    ...mapActions('assets', ['initAssetsDetail']),
  },
};
</script>
