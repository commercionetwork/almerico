<template>
  <TxMsgComponent :message="message">
    <div slot="body">
      <v-list-item v-for="(prop, index) in props" :key="index">
        <DetailItemComponent
          :label="formatKeyProp(prop[0])"
          :content="prop[1]"
          :isLoop="true"
        />
      </v-list-item>
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

export default {
  name: 'MsgSetParams',
  description: 'Display a set params transaction message',
  components: {
    DetailItemComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
    },
  },
  computed: {
    props() {
      const value = this.message;
      return Object.keys(value)
        .filter((key) => key !== '@type')
        .map((key) => {
          return [key, value[key]];
        });
    },
  },
  methods: {
    formatKeyProp(str) {
      return str.replace(/_/g, ' ');
    },
  },
};
</script>
