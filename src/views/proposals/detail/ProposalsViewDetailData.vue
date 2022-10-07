<template>
  <div>
    <div>
      <ProposalsViewDetailDataVoting />
    </div>
    <div class="mt-3">
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
    </div>
  </div>
</template>

<script>
import ProposalsViewDetailDataCommon from './ProposalsViewDetailDataCommon.vue';
import ProposalsViewDetailDataContent from './ProposalsViewDetailDataContent.vue';
import ProposalsViewDetailDataHeader from './ProposalsViewDetailDataHeader.vue';
import ProposalsViewDetailDataVoting from './ProposalsViewDetailDataVoting.vue';

export default {
  name: 'ProposalsViewDetailData',
  components: {
    ProposalsViewDetailDataCommon,
    ProposalsViewDetailDataContent,
    ProposalsViewDetailDataHeader,
    ProposalsViewDetailDataVoting,
  },
};
</script>
