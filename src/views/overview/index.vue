<template>
  <div>
    <v-row>
      <v-col cols="12">
        <OverviewHeader />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import OverviewHeader from './OverviewHeader.vue';

export default {
  name: 'overview',
  components: { OverviewHeader },
};
</script>
