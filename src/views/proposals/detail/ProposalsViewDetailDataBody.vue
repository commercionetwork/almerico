<template>
  <div>
    <BaseDetailItem :label="$t('labels.description')" :content="description" />
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
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-capitalize"
          v-text="$t('labels.content')"
        />
        <v-list-item>
          <component :is="getComponentName(proposal.content)" />
        </v-list-item>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';
import BasePlaceholderComponentError from '@/components/BasePlaceholderComponentError';
import BasePlaceholderComponentLoading from '@/components/BasePlaceholderComponentLoading';

import { coinAdapter, dateHandler } from '@/utils';
import { PROPOSALS } from '@/constants';
import { mapGetters } from 'vuex';

const components = {};
PROPOSALS.SUPPORTED_TYPES.forEach((component) => {
  components[component.name] = () => ({
    component: import(`./contents/${component.name}.vue`),
    loading: BasePlaceholderComponentLoading,
    error: BasePlaceholderComponentError,
    delay: 0,
    timeout: 5000,
  });
});

export default {
  name: 'ProposalsViewDetailDataBody',
  components: {
    ...components,
    BaseDetailItem,
  },
  data() {
    return {
      model: { components: PROPOSALS.SUPPORTED_TYPES },
    };
  },
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
  methods: {
    getComponentName(content) {
      const component = this.model.components.find(
        (component) => component.text === content['@type']
      );
      return component.name;
    },
  },
};
</script>
