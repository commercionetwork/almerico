<template>
  <v-card class="mt-3" color="transparent" flat>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="item in orderedList" :key="item.id">
        <ProposalsViewListItem :item="item" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ProposalsViewListItem from './ProposalsViewListItem.vue';

import { mapGetters } from 'vuex';
import { orderBy } from 'lodash';

export default {
  name: 'ProposalsViewListContentBottom',
  components: { ProposalsViewListItem },
  computed: {
    ...mapGetters('proposals', ['list']),
    orderedList() {
      return orderBy(this.list, ['proposal_id'], ['desc']);
    },
  },
};
</script>
