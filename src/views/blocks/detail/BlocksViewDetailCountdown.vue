<template>
  <v-row>
    <v-col cols="12" lg="2">
      <BlocksViewDetailCountdownCurrent />
    </v-col>
    <v-col cols="12" lg="8">
      <BlocksViewDetailCountdownTimer
        :countDown="countDown"
        :goalTime="goalTime"
      />
    </v-col>
    <v-col cols="12" lg="2">
      <BlocksViewDetailCountdownHeight />
    </v-col>
  </v-row>
</template>

<script>
import BlocksViewDetailCountdownCurrent from './BlocksViewDetailCountdownCurrent.vue';
import BlocksViewDetailCountdownHeight from './BlocksViewDetailCountdownHeight.vue';
import BlocksViewDetailCountdownTimer from './BlocksViewDetailCountdownTimer.vue';

import { mapGetters } from 'vuex';

export default {
  name: 'BlocksViewDetailCountdown',
  components: {
    BlocksViewDetailCountdownCurrent,
    BlocksViewDetailCountdownHeight,
    BlocksViewDetailCountdownTimer,
  },
  data() {
    return {
      countDown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      distance: 0,
      goalTime: 0,
      timer: null,
    };
  },
  computed: {
    ...mapGetters('blocks', ['supposedTime']),
  },
  created() {
    this.goalTime = this.supposedTime;
    this.setCountdown();
  },
  mounted() {
    this.timer = setInterval(() => this.setCountdown(), 1000);
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    setCountdown() {
      const now = new Date();
      this.distance = this.goalTime - now.getTime();
      if (this.distance > 0) {
        this.countDown.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
        this.countDown.hours = Math.floor(
          (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        this.countDown.minutes = Math.floor(
          (this.distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        this.countDown.seconds = Math.floor(
          (this.distance % (1000 * 60)) / 1000
        );
      } else {
        clearInterval(this.timer);
      }
    },
  },
};
</script>
