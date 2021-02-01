<template>
  <div>
    <span v-for="(message, index) in msgs" :key="index">
      <component v-bind:is="getComponentName(message)" :message="message" />
    </span>
  </div>
</template>

<script>
import MsgDefault from './msgs/MsgDefault.vue';

// import Config from '@/config/config.json';
let supportedTypes = []; //Config.transactions.supported_types;
let components = {};
supportedTypes.forEach((component) => {
  components[component.name] = () => import(`./msgs/${component.name}.vue`);
});

export default {
  name: 'TransactionDetailsMsg',
  components: {
    MsgDefault,
  },
  props: {
    msgs: {
      type: Array,
      note: 'Messages list to display',
    },
  },
  data: () => ({
    model: {
      components: supportedTypes,
    },
  }),
  methods: {
    getComponentName(message) {
      let component = this.model.components.find(
        (component) => component.type === message.type
      );
      return component ? component.name : MsgDefault.name;
    },
  },
};
</script>
