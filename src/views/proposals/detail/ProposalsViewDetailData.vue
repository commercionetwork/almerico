<template>
  <v-card outlined>
    <v-card-text>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="pb-1 font-weight-bold">
              <div class="d-flex flex-row justify-space-between align-center">
                <div>
                  <span>#</span>
                  <span v-text="proposal.proposal_id" />
                  <span>&nbsp;-&nbsp;</span>
                  <span v-text="proposal.content.title" />
                </div>
                <v-chip
                  class="white--text font-weight-bold"
                  :color="statusColor"
                >
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
        <v-divider />
        <BaseDetailItem
          :label="$t('labels.description')"
          :content="proposal.content.description"
        />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              class="text-capitalize"
              v-text="$t('labels.changes')"
            />
            <v-list-item v-for="(change, index) in changes" :key="index">
              <v-list dense>
                <v-list-item v-for="(value, key) in change" :key="key">
                  <BaseDetailItem
                    :label="key"
                    :content="value"
                    :is-loop="true"
                  />
                </v-list-item>
              </v-list>
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
        <BaseDetailItem
          :label="$t('labels.submitTime')"
          :content="submitTime"
        />
        <BaseDetailItem
          :label="$t('labels.depositEndTime')"
          :content="depositEndTime"
        />
        <v-list-item v-for="(amount, index) in deposits" :key="index">
          <BaseDetailItem
            :label="$t('labels.deposit')"
            :content="amount"
            :is-loop="true"
            look="text-uppercase"
          />
        </v-list-item>
        <BaseDetailItem
          :label="$t('labels.votingStartTime')"
          :content="votingStartTime"
        />
        <BaseDetailItem
          :label="$t('labels.votingEndTime')"
          :content="votingEndTime"
        />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';

import { PROPOSALS } from '@/constants';
import { coinAdapter, dateHandler, regExpBuilder } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailData',
  components: { BaseDetailItem },
  computed: {
    ...mapGetters('proposals', ['detail']),
    proposal() {
      return this.detail.proposal;
    },
    statusColor() {
      return PROPOSALS.COLORS[this.proposal.status];
    },
    statusText() {
      return PROPOSALS.TEXTS[this.proposal.status];
    },
    type() {
      const lastSegment = this.proposal['content']['@type'].match(
        regExpBuilder.getTypeRegExp()
      )[0];
      return lastSegment.substring(1);
    },
    changes() {
      return this.proposal.content.changes;
    },
    submitTime() {
      return dateHandler.getUtcDate(this.proposal.submit_time);
    },
    depositEndTime() {
      return dateHandler.getUtcDate(this.proposal.deposit_end_time);
    },
    deposits() {
      return this.proposal.total_deposit.map((amount) =>
        coinAdapter.format({
          amount: amount.amount,
          denom: amount.denom,
        })
      );
    },
    votingEndTime() {
      return dateHandler.getUtcDate(this.proposal.voting_end_time);
    },
    votingStartTime() {
      return dateHandler.getUtcDate(this.proposal.voting_start_time);
    },
  },
};
</script>
