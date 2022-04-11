<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="pb-1 font-weight-bold">
        <div class="d-flex flex-row justify-space-between align-center">
          <div>
            <span>#</span>
            <span v-text="id" />
            <span>&nbsp;-&nbsp;</span>
            <span v-text="title" />
          </div>
          <v-chip class="white--text font-weight-bold" :color="statusColor">
            {{ statusText }}
          </v-chip>
        </div>
      </v-list-item-title>
      <v-list-item-subtitle
        class="pb-1 text-capitalize font-italic"
        v-text="type"
      />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
import { PROPOSALS } from '@/constants';
import { regExpBuilder } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailDataHeader',
  computed: {
    ...mapGetters('proposals', ['proposal']),
    id() {
      return this.proposal ? this.proposal.proposal_id : '-';
    },
    title() {
      return this.proposal ? this.proposal.content.title : '-';
    },
    statusColor() {
      return this.proposal
        ? PROPOSALS.COLORS[this.proposal.status]
        : 'secondary';
    },
    statusText() {
      return this.proposal ? PROPOSALS.TEXTS[this.proposal.status] : '-';
    },
    type() {
      const lastSegment = this.proposal
        ? this.proposal['content']['@type'].match(
            regExpBuilder.getTypeRegExp()
          )[0]
        : '-';
      return lastSegment.substring(1);
    },
  },
};
</script>
