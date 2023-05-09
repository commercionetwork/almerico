<template>
  <v-row>
    <v-col cols="12">
      <the-alert-notice kind="error" :message="$t('msgs.notFound')" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IssueNotFoundView',
  description: '404 page',
};
</script>
