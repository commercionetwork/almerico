<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <BaseDetailItem :label="$t('labels.id')" :content="proposalId" />
      <BaseDetailLink
        :label="$t('labels.voter')"
        :content="voterAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: voterAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem :label="$t('labels.vote')" :content="vote" />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgVote',
  description: 'Display a vote transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
