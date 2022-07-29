<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="py-1 text-h5 font-weight-bold"
          v-text="$t('labels.description')"
        />
        <v-list-item-subtitle class="py-1" v-html="description" />
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

import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailDataCommon',
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
        ? new Date(this.proposal.submit_time).toLocaleString()
        : '-';
    },
    depositEndTime() {
      return this.proposal
        ? new Date(this.proposal.deposit_end_time).toLocaleString()
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
        ? new Date(this.proposal.voting_end_time).toLocaleString()
        : '-';
    },
    votingStartTime() {
      return this.proposal
        ? new Date(this.proposal.voting_start_time).toLocaleString()
        : '-';
    },
  },
};
</script>
