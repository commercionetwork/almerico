<template>
  <v-btn color="primary" outlined>
    <div class="text-caption" v-text="$t('labels.save')" />
  </v-btn>
</template>

<script>
export default {
  name: 'AssetsModalBtnMarketing',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
};
</script>
