<template>
  <MsgShareDocumentLazy :message="message" />
</template>

<script>
import TxMsgPlaceholderComponent from '@/components/TxMsgPlaceholderComponent';
import { lazyLoader } from '@/utils';

export default {
  name: 'MsgShareDocument',
  components: {
    MsgShareDocumentLazy: lazyLoader.loadComponent({
      componentFactory: () => import('./MsgShareDocumentLazy.vue'),
      loading: TxMsgPlaceholderComponent,
    }),
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
