<template>
  <v-list>
    <base-detail-item :label="$t('labels.type')" :content="type" />
    <base-detail-link
      :label="$t('labels.recipient')"
      :content="recipient"
      :route="{
        name: ROUTES.NAME.ACCOUNT,
        params: { id: recipient },
      }"
    />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <span class="text-capitalize" v-text="$t('labels.amount')" />
        </v-list-item-title>
        <v-list v-for="(el, index) in amount" :key="index">
          <v-list-item>
            <base-detail-item
              :label="$t('labels.amount')"
              :content="el.amount"
            />
          </v-list-item>
          <v-list-item>
            <base-detail-item :label="$t('labels.denom')" :content="el.denom" />
          </v-list-item>
        </v-list>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'CommunityPoolSpendProposal',
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
    recipient() {
      return this.content.recipient || `-`;
    },
    amount() {
      return this.content.amount || [];
    },
  },
};
</script>
