<template>
  <v-card outlined shaped>
    <v-toolbar flat>
      <v-toolbar-title>
        <span v-text="proposalId" />
      </v-toolbar-title>
      {{ '&nbsp;-&nbsp;' }}
      <router-link :to="toDetail" :title="$t('labels.detail')">
        <v-icon size="20">{{ mdiOpenInNew }}</v-icon>
      </router-link>
      <v-spacer />
      <v-chip
        class="ml-1 ml-md-3 text-caption white--text font-weight-bold"
        :color="statusColor"
      >
        {{ statusText }}
      </v-chip>
      <template v-slot:extension>
        <v-icon left size="24">
          {{ PROPOSALS.ICONS[type] }}
        </v-icon>
        <span
          class="text-caption text-truncate"
          v-text="PROPOSALS.LABELS[type]"
        />
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
      <div class="pa-2 text-h6 text-truncate" v-text="item.content.title" />
      <div description-card__container>
        <div
          class="mx-2 px-2 py-1 text-body-2 description-card__content"
          v-html="item.content.description"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { PROPOSALS, ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';
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
      return new Date(this.item.voting_end_time).toLocaleString();
    },
    votingStartTime() {
      return new Date(this.item.voting_start_time).toLocaleString();
    },
  },
};
</script>

<style scoped>
.description-card__container {
  height: 4.5rem;
  max-height: 4.5rem;
  overflow: hidden;
}

.description-card__content {
  display: block;
  border: 1px solid;
  height: 4.5rem;
  max-height: 4.5rem;
  overflow-y: scroll;
}
</style>
