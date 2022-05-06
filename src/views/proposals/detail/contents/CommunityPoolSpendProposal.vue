<template>
  <v-list>
    <BaseDetailItem :label="$t('labels.type')" :content="type" />
    <BaseDetailItem :label="$t('labels.title')" :content="title" />
    <BaseDetailItem :label="$t('labels.description')" :content="description" />
    <BaseDetailLink
      :label="$t('labels.recipient')"
      :content="recipient"
      :route="{
        name: ROUTES.NAME.ACCOUNT,
        params: { id: recipient },
      }"
    />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title
          class="text-capitalize"
          v-text="$t('labels.amount')"
        />
        <v-list v-for="(el, index) in amount" :key="index">
          <v-list-item>
            <BaseDetailItem :label="$t('labels.amount')" :content="el.amount" />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem :label="$t('labels.denom')" :content="el.denom" />
          </v-list-item>
        </v-list>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';
import BaseDetailLink from '@/components/BaseDetailLink';

import { ROUTES } from '@/constants';

export default {
  name: 'CommunityPoolSpendProposal',
  components: {
    BaseDetailItem,
    BaseDetailLink,
  },
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
  },
  data() {
    return { ROUTES };
  },
  computed: {
    type() {
      return this.content['@type'] || '-';
    },
    title() {
      return this.content.title || `-`;
    },
    description() {
      return this.content.description || `-`;
    },
    recipient() {
      return this.content.recipient || `-`;
    },
    amount() {
      return this.content.amount || [];
    },
  },
};
</script>
