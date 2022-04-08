<template>
  <v-card outlined>
    <v-toolbar flat>
      <v-toolbar-title>
        <span v-text="title" />
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn :to="toDetail" icon v-bind="attrs" v-on="on">
              <v-icon size="20">{{ mdiOpenInNew }}</v-icon>
            </v-btn>
          </template>
          <span v-text="$t('labels.detail')" />
        </v-tooltip>
      </v-toolbar-title>
      <template v-slot:extension>
        <v-avatar :color="statusColor" size="36">
          <v-icon color="white" size="24">
            {{ PROPOSALS.ICONS[type] }}
          </v-icon>
        </v-avatar>
        <span class="pl-1 text-caption" v-text="type" />
        <v-spacer />
        <v-chip class="ma-2 white--text font-weight-bold" :color="statusColor">
          {{ statusText }}
        </v-chip>
      </template>
    </v-toolbar>
    <v-divider />
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <div>
          <div class="font-weight-bold" v-text="$t('labels.votingStartTime')" />
          <div v-text="votingStartTime" />
        </div>
        <div>
          <div class="font-weight-bold" v-text="$t('labels.votingEndTime')" />
          <div v-text="votingEndTime" />
        </div>
      </div>

      <div class="pt-1 font-weight-bold" v-text="$t('labels.description')" />
      <div v-text="item.content.description" />
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
