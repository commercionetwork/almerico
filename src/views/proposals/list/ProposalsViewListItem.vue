<template>
  <v-card outlined shaped>
    <v-toolbar flat>
      <v-toolbar-title>
        <span v-text="proposalId" />
      </v-toolbar-title>
      <v-spacer />
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-btn :to="toDetail" icon v-bind="attrs" v-on="on">
            <v-icon size="20">{{ mdiOpenInNew }}</v-icon>
          </v-btn>
        </template>
        <span v-text="$t('labels.detail')" />
      </v-tooltip>
      <template v-slot:extension>
        <v-row class="d-flex align-center align-content-center">
          <v-col cols="4">
            <v-chip
              class="text-caption white--text font-weight-bold"
              :color="statusColor"
            >
              {{ statusText }}
            </v-chip>
          </v-col>
          <v-col cols="8" class="d-flex justify-end">
            <span class="text-caption" v-text="type" />
            <v-icon right size="24">
              {{ PROPOSALS.ICONS[type] }}
            </v-icon>
          </v-col>
        </v-row>
      </template>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="12" sm="6" class="d-flex flex-column align-sm-center">
          <div class="font-weight-bold" v-text="$t('labels.votingStartTime')" />
          <div v-text="votingStartTime" />
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column align-sm-center">
          <div class="font-weight-bold" v-text="$t('labels.votingEndTime')" />
          <div v-text="votingEndTime" />
        </v-col>
      </v-row>
      <!-- <div class="text-caption d-flex justify-space-between align-center">
        <div class="text-center">
          <div class="font-weight-bold" v-text="$t('labels.votingStartTime')" />
          <div v-text="votingStartTime" />
        </div>
        <div class="text-center">
          <div class="font-weight-bold" v-text="$t('labels.votingEndTime')" />
          <div v-text="votingEndTime" />
        </div>
      </div> -->
      <div class="pa-2 text-h6 text-truncate" v-text="item.content.title" />
      <v-card height="80" outlined>
        <v-card-text v-text="item.content.description" />
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { PROPOSALS, ROUTES } from '@/constants';
import { dateHandler, regExpBuilder } from '@/utils';
import { mdiOpenInNew } from '@mdi/js';

export default {
  name: 'ProposalsViewListItem',
  props: {
    item: {
      type: Object,
      required: true,
      note: 'The proposal to display',
    },
  },
  data() {
    return { PROPOSALS, mdiOpenInNew };
  },
  computed: {
    proposalId() {
      return `#${this.item.proposal_id}`;
    },
    statusColor() {
      return PROPOSALS.COLORS[this.item.status];
    },
    statusText() {
      return PROPOSALS.TEXTS[this.item.status];
    },
    title() {
      return `#${this.item.proposal_id} - ${this.item.content.title}`;
    },
    toDetail() {
      return {
        name: ROUTES.NAME.PROPOSALS_DETAIL,
        params: { id: this.item.proposal_id },
      };
    },
    type() {
      const lastSegment = this.item['content']['@type'].match(
        regExpBuilder.getTypeRegExp()
      )[0];
      return lastSegment.substring(1);
    },
    votingEndTime() {
      return dateHandler.getUtcDate(this.item.voting_end_time);
    },
    votingStartTime() {
      return dateHandler.getUtcDate(this.item.voting_start_time);
    },
  },
};
</script>
