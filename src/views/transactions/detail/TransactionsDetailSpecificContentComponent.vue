<template>
  <component v-bind:is="componentFile" :message="message" />
</template>

<script>
import MsgDefault from './msgs/MsgDefault.vue';

import { TRANSACTIONS } from '@/constants';

export default {
  name: 'TransactionsDetailSpecificContentComponent',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a share document message',
    },
  },
  data: () => ({
    model: {
      components: TRANSACTIONS.SUPPORTED_TYPES,
    },
  }),
  computed: {
    componentFile() {
      const componentName = this.getComponentName();
      return () => import(`./msgs/${componentName}.vue`);
    },
  },
  methods: {
    getComponentName() {
      const component = this.model.components.find(
        (component) => component.text === this.message['@type'],
      );
      return component ? component.name : MsgDefault.name;
    },
  },
};
</script>
