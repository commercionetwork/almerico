<template>
  <v-alert border="left" outlined type="info">
    <span class="text-body-1" v-text="$t('msgs.underMaintenance')"></span>
    <template #prepend>
      <v-icon left color="info" size="50">
        {{ mdiWrenchClock }}
      </v-icon>
    </template>
  </v-alert>
</template>

<script>
import { mdiWrenchClock } from '@mdi/js';

export default {
  name: 'WorkInProgress',
  description: 'Maintenance page',
  data() {
    return {
      mdiWrenchClock,
    };
  },
};
</script>
