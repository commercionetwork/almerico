<template>
  <v-card flat>
    <v-card-subtitle>
      <div class="text-h6" v-text="$t('titles.marketingDetail')" />
      <div v-text="$t('msgs.addingAMarketer')" />
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <base-form-text-field
            id="marketing-project"
            :label="$t('labels.project')"
            v-model.trim="model.project"
          />
        </v-col>
        <v-col cols="12">
          <base-form-text-field
            id="marketing-description"
            :label="$t('labels.description')"
            v-model.trim="model.description"
          />
        </v-col>
        <v-col cols="12">
          <base-form-text-field
            id="marketing-wallet"
            :label="$t('labels.wallet')"
            v-model.trim="model.marketing"
          />
        </v-col>
        <v-col cols="12">
          <base-form-text-field
            id="marketing-logo"
            :label="$t('labels.logoUrl')"
            v-model.trim="model.logo"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AssetsViewNewMarketing',
  data() {
    return {
      model: {
        description: '',
        logo: '',
        marketing: '',
        project: '',
      },
    };
  },
};
</script>
