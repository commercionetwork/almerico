<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <ProposalsViewDetailDataHeader />
        <v-divider />
        <ProposalsViewDetailDataCommon />
        <ProposalsViewDetailDataContent />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import ProposalsViewDetailDataCommon from './ProposalsViewDetailDataCommon.vue';
import ProposalsViewDetailDataContent from './ProposalsViewDetailDataContent.vue';
import ProposalsViewDetailDataHeader from './ProposalsViewDetailDataHeader.vue';

export default {
  name: 'ProposalsViewDetailData',
  components: {
    ProposalsViewDetailDataCommon,
    ProposalsViewDetailDataContent,
    ProposalsViewDetailDataHeader,
  },
};
</script>
