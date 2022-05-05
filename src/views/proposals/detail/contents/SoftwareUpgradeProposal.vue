<template>
  <v-list>
    <BaseDetailItem :label="$t('labels.type')" :content="type" />
    <BaseDetailItem :label="$t('labels.title')" :content="title" />
    <BaseDetailItem :label="$t('labels.description')" :content="description" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-capitalize" v-text="$t('labels.plan')" />
        <v-list>
          <v-list-item>
            <BaseDetailItem :label="$t('labels.time')" :content="planTime" />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem
              :label="$t('labels.height')"
              :content="planHeight"
            />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem :label="$t('labels.name')" :content="planName" />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem :label="$t('labels.info')" :content="planInfo" />
          </v-list-item>
          <v-list-item>
            <BaseDetailItem
              :label="$t('labels.upgradedClientState')"
              :content="planUpgradedClientState"
            />
          </v-list-item>
        </v-list>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem';

export default {
  name: 'SoftwareUpgradeProposal',
  components: { BaseDetailItem },
  props: {
    content: {
      type: Object,
      required: true,
      note: 'The content to display',
    },
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
    planName() {
      return this.content.plan.name ? this.content.plan.name : `-`;
    },
    planTime() {
      return this.content.plan.time ? this.content.plan.time : `-`;
    },
    planHeight() {
      return this.content.plan.height ? this.content.plan.height : `-`;
    },
    planInfo() {
      return this.content.plan.info ? this.content.plan.info : `-`;
    },
    planUpgradedClientState() {
      return this.content.plan.upgraded_client_state
        ? this.content.plan.upgraded_client_state
        : `-`;
    },
  },
};
</script>
