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
import { filter, orderBy } from 'lodash';

export default {
  name: 'ProposalsViewListContentBottom',
  components: { ProposalsViewListItem },
  props: {
    filter: {
      type: String,
      default: '',
      note: 'The status of the proposal to filter the list',
    },
  },
  computed: {
    ...mapGetters('proposals', ['list']),
    orderedList() {
      const items = !this.filter
        ? this.list
        : filter(this.list, { status: this.filter });
      return orderBy(items, ['proposal_id'], ['desc']);
    },
  },
};
</script>
