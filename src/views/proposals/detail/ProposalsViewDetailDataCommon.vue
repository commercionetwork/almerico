<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="py-1 text-h5 font-weight-bold">
          <span v-text="$t('labels.description')" />
        </v-list-item-title>
        <v-list-item-subtitle class="py-1">
          <span v-html="description" />
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <base-detail-item :label="$t('labels.submitTime')" :content="submitTime" />
    <base-detail-item
      :label="$t('labels.depositEndTime')"
      :content="depositEndTime"
    />
    <v-list-item v-for="(amount, index) in deposits" :key="index">
      <base-detail-item
        :label="$t('labels.deposit')"
        :content="amount"
        :is-loop="true"
        look="text-uppercase"
      />
    </v-list-item>
    <base-detail-item
      :label="$t('labels.votingStartTime')"
      :content="votingStartTime"
    />
    <base-detail-item
      :label="$t('labels.votingEndTime')"
      :content="votingEndTime"
    />
  </div>
</template>

<script>
import { coinAdapter } from '@/utils';
import { mapGetters } from 'vuex';

export default {
  name: 'ProposalsViewDetailDataCommon',
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
