<template>
  <AlertComponent kind="info" :message="$t('msgs.dataNotAvailable')" />
</template>

<script>
import AlertComponent from '@/components/AlertComponent.vue';

export default {
  name: 'PlaceholderErrorComponent',
  components: { AlertComponent },
};
1;
</script>
