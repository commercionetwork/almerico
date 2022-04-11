<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <ProposalsViewDetailDataHeader />
        <v-divider />
        <ProposalsViewDetailDataBody />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import ProposalsViewDetailDataBody from './ProposalsViewDetailDataBody.vue';
import ProposalsViewDetailDataHeader from './ProposalsViewDetailDataHeader.vue';

export default {
  name: 'ProposalsViewDetailData',
  components: {
    ProposalsViewDetailDataBody,
    ProposalsViewDetailDataHeader,
  },
};
</script>
