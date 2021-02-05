<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item v-for="(prop, index) in props" :key="index">
        <v-list-item-content class="text-body-2">
          <div>
            <span class="text-capitalize font-weight-bold">
              {{ formatKeyProp(prop[0]) }}:
            </span>
            {{ prop[1] }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from '@/components/MsgTx.vue';

export default {
  name: 'MsgDefault',
  description: 'Display a not handled transaction message',
  components: {
    MsgTx,
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
