<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item v-for="(prop, index) in props" :key="index">
        <MsgItemComponent :label="formatKeyProp(prop[0])" :content="prop[1]" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';

export default {
  name: 'MsgDefault',
  description: 'Display a not handled transaction message',
  components: {
    MsgItemComponent,
    MsgTxComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a message',
    },
  },
  computed: {
    props() {
      const value = this.message.value;
      return Object.keys(value).map((key) => {
        return [key, value[key]];
      });
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
  methods: {
    formatKeyProp(str) {
      return str.replace(/_/g, ' ');
    },
  },
};
</script>
