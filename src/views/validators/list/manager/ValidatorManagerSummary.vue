<template>
  <Component v-bind:is="currentSummary" :summary="summary" />
</template>

<script>
import ValidatorManagerSummaryDelegate from './ValidatorManagerSummaryDelegate.vue';
import ValidatorManagerSummaryRedelegate from './ValidatorManagerSummaryRedelegate.vue';
import ValidatorManagerSummaryUndelegate from './ValidatorManagerSummaryUndelegate.vue';

export default {
  name: 'ValidatorManagerSummary',
  components: {
    ValidatorManagerSummaryDelegate,
    ValidatorManagerSummaryRedelegate,
    ValidatorManagerSummaryUndelegate,
  },
  props: ['actionId', 'summary'],
  computed: {
    currentSummary() {
      switch (this.actionId) {
        case 2:
          return ValidatorManagerSummaryRedelegate;
        case 3:
          return ValidatorManagerSummaryUndelegate;
        default:
          return ValidatorManagerSummaryDelegate;
      }
    },
  },
};
</script>
