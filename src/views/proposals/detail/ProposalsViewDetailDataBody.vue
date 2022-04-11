<template>
  <div>
    <BaseDetailItem :label="$t('labels.description')" :content="description" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-capitalize"
          v-text="$t('labels.changes')"
        />
        <v-list-item v-for="(change, index) in changes" :key="index">
          <v-list dense>
            <v-list-item v-for="(value, key) in change" :key="key">
              <BaseDetailItem :label="key" :content="value" :is-loop="true" />
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list-item-content>
    </v-list-item>
    <BaseDetailItem :label="$t('labels.submitTime')" :content="submitTime" />
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
  </div>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';

import { coinAdapter, dateHandler } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailDataBody',
  components: { BaseDetailItem },
  computed: {
    ...mapGetters('proposals', ['proposal']),
    description() {
      return this.proposal ? this.proposal.content.description : '-';
    },
    changes() {
      return this.proposal ? this.proposal.content.changes : [];
    },
    submitTime() {
      return this.proposal
        ? dateHandler.getUtcDate(this.proposal.submit_time)
        : '-';
    },
    depositEndTime() {
      return this.proposal
        ? dateHandler.getUtcDate(this.proposal.deposit_end_time)
        : -'';
    },
    deposits() {
      return this.proposal
        ? this.proposal.total_deposit.map((amount) =>
            coinAdapter.format({
              amount: amount.amount,
              denom: amount.denom,
            })
          )
        : [];
    },
    votingEndTime() {
      return this.proposal
        ? dateHandler.getUtcDate(this.proposal.voting_end_time)
        : '-';
    },
    votingStartTime() {
      return this.proposal
        ? dateHandler.getUtcDate(this.proposal.voting_start_time)
        : '-';
    },
  },
};
</script>
