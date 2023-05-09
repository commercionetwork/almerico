<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-item :label="$t('labels.id')" :content="proposalId" />
      <base-detail-link
        :label="$t('labels.voter')"
        :content="voterAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: voterAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item :label="$t('labels.vote')" :content="vote" />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgVote',
  description: 'Display a vote transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a vote message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    proposalId() {
      return this.message.proposal_id;
    },
    vote() {
      return this.message.option;
    },
    voterAddress() {
      return this.message.voter;
    },
  },
};
</script>
