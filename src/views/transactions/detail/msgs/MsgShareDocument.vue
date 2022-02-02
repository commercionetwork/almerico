<template>
  <MsgShareDocumentAsync :message="message" />
</template>

<script>
import PlaceholderErrorComponent from '@/components/PlaceholderErrorComponent';
import PlaceholderLoadingComponent from '@/components/PlaceholderLoadingComponent';

const MsgShareDocumentAsync = () => ({
  component: import('./MsgShareDocument.async.vue'),
  loading: PlaceholderLoadingComponent,
  error: PlaceholderErrorComponent,
  delay: 0,
  timeout: 5000,
});

export default {
  name: 'MsgShareDocument',
  components: {
    MsgShareDocumentAsync,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a share document message',
    },
  },
};
</script>
