<template>
  <v-row>
    <v-col cols="12" md="6">
      <TransactionsDetailCommonContentComponent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <div v-for="(message, index) in tx.msgs" :key="index">
        <component v-bind:is="getComponentName(message)" :message="message" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MsgDefault from './msgs/MsgDefault.vue';
import TransactionsDetailCommonContentComponent from './TransactionsDetailCommonContentComponent.vue';

import transactionsDetailHelper from './helpers/transactionsDetailHelper';
import { TRANSACTIONS } from '@/constants';
import { mapGetters } from 'vuex';

const components = {};
TRANSACTIONS.SUPPORTED_TYPES.forEach((component) => {
  components[component.name] = () => import(`./msgs/${component.name}.vue`);
});

export default {
  name: 'TransactionsDetailContentComponent',
  components: {
    ...components,
    MsgDefault,
    TransactionsDetailCommonContentComponent,
  },
  data: () => ({
    model: {
      components: TRANSACTIONS.SUPPORTED_TYPES,
    },
  }),
  computed: {
    ...mapGetters('transactions', {
      detail: 'detail',
    }),
    tx() {
      return transactionsDetailHelper.build({
        detail: this.detail,
        labels: {
          success: this.$t('labels.success'),
          failed: this.$t('labels.failed'),
          multiTypes: this.$t('labels.multiTypes'),
        },
      });
    },
  },
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
