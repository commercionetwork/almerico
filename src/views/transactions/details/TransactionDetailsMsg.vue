<template>
  <v-card elevation="2">
    <v-list class="ma-1" v-for="(msg, index) in msgs" :key="index">
      <v-list-item-title class="pl-1 font-weight-bold" v-text="getType(msg)" />
      <v-divider />
      <v-list-item v-for="(prop, index) in getProps(msg)" :key="index">
        <v-list-item-content class="text-body-2 text-break">
          <div><span class="font-weight-bold">{{ prop[0] }}: </span>{{ prop[1] }}</div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionDetailsMsg',
  props: {
    msgs: {
      type: Array,
      note: 'Messages list to display',
    },
  },
  computed: {
    ...mapGetters('transactions', {
      transaction: 'details',
    }),
  },
  methods: {
    getProps(msg) {
      const value = msg.value;
      return Object.keys(value).map((key) => {
        return [key, value[key]];
      });
    },
    getType(msg) {
      return msg.type ? msg.type.split('/').pop() : '-';
    },
  },
};
</script>
