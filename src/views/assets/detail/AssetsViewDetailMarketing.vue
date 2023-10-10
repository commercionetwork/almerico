<template>
  <v-card outlined>
    <v-card-title>
      <div v-text="$t('titles.marketingDetail')" />
      <v-spacer />
      <div v-if="marketing">
        <v-btn icon @click="dialog.marketing = true">
          <v-icon size="20">{{ mdiPencil }}</v-icon>
        </v-btn>
        <assets-modal-marketing
          :marketing="marketing"
          v-model="dialog.marketing"
        />
        <v-btn icon @click="dialog.logo = true">
          <v-icon size="20">{{ mdiImage }}</v-icon>
        </v-btn>
        <assets-modal-logo v-model="dialog.logo" />
      </div>
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
import AssetsModalLogo from './marketing/AssetsModalLogo.vue';
import AssetsModalMarketing from './marketing/AssetsModalMarketing.vue';

import { mdiImage, mdiPencil } from '@mdi/js';
import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';

export default {
  name: 'AssetsViewDetailMarketing',
  components: {
    AssetsModalLogo,
    AssetsModalMarketing,
  },
  data() {
    return {
      ROUTES,
      mdiImage,
      mdiPencil,
      dialog: {
        marketing: false,
        logo: false,
      },
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
      return this.marketing && this.marketing.logo
        ? this.marketing.logo.url
        : '-';
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
