<template>
  <BaseTopContentCard :title="$t('titles.countdownForBlock')">
    <template #content>
      <v-row>
        <v-col cols="12" sm="3" class="d-flex flex-column align-center">
          <div class="font-weight-bold" v-text="$t('labels.height')" />
          <div
            class="pa-3 text-h4 primary--text font-weight-bold"
            v-text="height"
          />
        </v-col>
        <v-col cols="12" sm="9">
          <v-row>
            <v-col cols="12" sm="3" class="d-flex flex-column align-center">
              <div class="font-weight-bold" v-text="$t('labels.days')" />
              <div
                class="pa-3 text-h4 primary--text font-weight-bold"
                v-text="countDown.days"
              />
            </v-col>
            <v-col cols="12" sm="3" class="d-flex flex-column align-center">
              <div class="font-weight-bold" v-text="$t('labels.hours')" />
              <div
                class="pa-3 text-h4 primary--text font-weight-bold"
                v-text="countDown.hours"
              />
            </v-col>
            <v-col cols="12" sm="3" class="d-flex flex-column align-center">
              <div class="font-weight-bold" v-text="$t('labels.minutes')" />
              <div
                class="pa-3 text-h4 primary--text font-weight-bold"
                v-text="countDown.minutes"
              />
            </v-col>
            <v-col cols="12" sm="3" class="d-flex flex-column align-center">
              <div class="font-weight-bold" v-text="$t('labels.seconds')" />
              <div
                class="pa-3 text-h4 primary--text font-weight-bold"
                v-text="countDown.seconds"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex justify-center">
          <div v-text="estimatedDate" />
        </v-col>
      </v-row>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard';

export default {
  name: 'BlocksViewDetailCountdownTimer',
  components: { BaseTopContentCard },
  inject: ['height'],
  props: {
    countDown: {
      type: Object,
    },
    goalTime: {
      type: Number,
    },
  },
  computed: {
    estimatedDate() {
      const datum = new Date(this.goalTime);
      return `${this.$t('msgs.estimatedTime')}: ${datum}`;
    },
  },
};
</script>
