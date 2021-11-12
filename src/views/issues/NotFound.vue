<template>
  <v-row>
    <v-col cols="12">
      <AlertComponent kind="error" :message="$t('msgs.notFound')" />
    </v-col>
  </v-row>
</template>

<script>
import AlertComponent from '@/components/AlertComponent';

export default {
  name: 'NotFound',
  description: '404 page',
  components: {
    AlertComponent,
  },
};
</script>
