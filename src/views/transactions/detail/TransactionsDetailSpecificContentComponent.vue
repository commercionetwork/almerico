<template>
  <component v-bind:is="getComponentName(message)" :message="message" />
</template>

<script>
import MsgDefault from './msgs/MsgDefault.vue';

import { TRANSACTIONS } from '@/constants';

const components = {};
TRANSACTIONS.SUPPORTED_TYPES.forEach((component) => {
  components[component.name] = () => import(`./msgs/${component.name}.vue`);
});

export default {
  name: 'TransactionsDetailSpecificContentComponent',
  components: {
    ...components,
    MsgDefault,
  },
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
  methods: {
    getComponentName(message) {
      const component = this.model.components.find(
        (component) => component.text === message['@type'],
      );
      return component ? component.name : MsgDefault.name;
    },
  },
};
</script>
