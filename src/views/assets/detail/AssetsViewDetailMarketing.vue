<template>
  <v-card outlined>
    <v-card-title>
      <span v-text="$t('titles.marketingDetail')" />
    </v-card-title>
    <v-divider class="mx-3" />
    <v-card-text>
      <v-list dense>
        <base-detail-item
          :label="$t('labels.project')"
          :content="project"
        ></base-detail-item>
        <base-detail-item
          :label="$t('labels.description')"
          :content="description"
        ></base-detail-item>
        <base-detail-link
          :label="$t('labels.marketing')"
          :content="marketingMarketing"
          :route="{
            name: ROUTES.NAME.ACCOUNT,
            params: { id: marketingMarketing },
          }"
        ></base-detail-link>
        <base-detail-item
          :label="$t('labels.logo')"
          :content="logo"
        ></base-detail-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';

export default {
  name: 'AssetsViewDetailMarketing',
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    ...mapGetters('assets', ['detail']),
    marketing() {
      return this.detail && this.detail.marketing
        ? this.detail.marketing
        : null;
    },
    description() {
      return this.marketing && this.marketing.description
        ? this.marketing.description
        : '-';
    },
    logo() {
      return this.marketing && this.marketing.logo ? this.marketing.logo : '-';
    },
    marketingMarketing() {
      return this.marketing && this.marketing.marketing
        ? this.marketing.marketing
        : '-';
    },
    project() {
      return this.marketing && this.marketing.project
        ? this.marketing.project
        : '-';
    },
  },
};
</script>
