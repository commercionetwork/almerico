<template>
  <v-card outlined>
    <assets-view-new-detail />
    <v-divider class="mx-3" />
    <assets-view-new-minting />
    <v-divider class="mx-3" />
    <assets-view-new-marketing />
  </v-card>
</template>

<script>
import AssetsViewNewDetail from './AssetsViewNewDetail.vue';
import AssetsViewNewMarketing from './AssetsViewNewMarketing.vue';
import AssetsViewNewMinting from './AssetsViewNewMinting.vue';

export default {
  name: 'AssetsViewNewForm',
  components: {
    AssetsViewNewDetail,
    AssetsViewNewMarketing,
    AssetsViewNewMinting,
  },
};
</script>
