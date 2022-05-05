<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title class="pb-1 font-weight-bold">
        <v-row>
          <v-col cols="12" md="8" xl="10">
            <div class="text-wrap text-h6 font-weight-bold">
              <span>#</span>
              <span v-text="id" />
              <span>&nbsp;-&nbsp;</span>
              <span v-text="title" />
            </div>
            <div class="text-subtitle-1 font-italic" v-text="type" />
          </v-col>
          <v-col cols="12" md="4" xl="2" class="d-flex justify-md-end">
            <v-chip
              class="text-caption white--text font-weight-bold"
              :color="statusColor"
            >
              {{ statusText }}
            </v-chip>
          </v-col>
        </v-row>
      </v-list-item-title>
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
