<template>
  <v-row>
    <v-col cols="12">
      <TheAlertNotice kind="error" :message="$t('msgs.notFound')" />
    </v-col>
  </v-row>
</template>

<script>
import TheAlertNotice from '@/components/TheAlertNotice';

export default {
  name: 'IssueNotFoundView',
  description: '404 page',
  components: {
    TheAlertNotice,
  },
};
</script>
