<template>
  <v-card outlined>
    <v-card-title>
      <span v-text="$t('titles.technicalInfo')" />
    </v-card-title>
    <v-divider class="mx-3" />
    <v-card-text>
      <v-list dense>
        <base-detail-item
          :label="$t('labels.contractAddress')"
          :content="contractAddress"
        ></base-detail-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AssetsViewDetailTechnical',
  computed: {
    ...mapGetters('assetsDetail', ['contract']),
    contractAddress() {
      return this.contract || '-';
    },
  },
};
</script>
