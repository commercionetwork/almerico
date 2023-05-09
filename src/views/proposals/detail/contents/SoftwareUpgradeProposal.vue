<template>
  <v-list>
    <base-detail-item :label="$t('labels.type')" :content="type" />
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <span class="text-capitalize" v-text="$t('labels.plan')" />
        </v-list-item-title>
        <v-list>
          <v-list-item>
            <base-detail-item :label="$t('labels.time')" :content="planTime" />
          </v-list-item>
          <v-list-item>
            <base-detail-item
              :label="$t('labels.height')"
              :content="planHeight"
            />
          </v-list-item>
          <v-list-item>
            <base-detail-item :label="$t('labels.name')" :content="planName" />
          </v-list-item>
          <v-list-item>
            <base-detail-item :label="$t('labels.info')" :content="planInfo" />
          </v-list-item>
          <v-list-item>
            <base-detail-item
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
export default {
  name: 'SoftwareUpgradeProposal',
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
    description() {
      return this.content.description || `-`;
    },
    planName() {
      return this.content.plan.name ? this.content.plan.name : `-`;
    },
    planTime() {
      return this.content.plan.time
        ? new Date(this.content.plan.time).toLocaleString()
        : `-`;
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
