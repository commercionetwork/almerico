<template>
  <TheAlertNotice kind="info" :message="$t('msgs.dataNotAvailable')" />
</template>

<script>
import TheAlertNotice from '@/components/TheAlertNotice.vue';

export default {
  name: 'BasePlaceholderComponentError',
  components: { TheAlertNotice },
};
1;
</script>
