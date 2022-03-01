<template>
  <v-row>
    <v-col cols="12" md="6">
      <TheTransactionsCommonContent :tx="tx" />
    </v-col>
    <v-col cols="12" md="6">
      <div v-for="(message, index) in tx.msgs" :key="index">
        <component :is="getComponentName(message)" :message="message" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MsgDefault from '../common/MsgDefault.vue';
import BasePlaceholderComponentError from '@/components/BasePlaceholderComponentError';
import BasePlaceholderComponentLoading from '@/components/BasePlaceholderComponentLoading';
import TheTransactionsCommonContent from '../common/TheTransactionsCommonContent.vue';

import transactionsDetailHelper from '../common/helpers/transactionsDetailHelper';
import { TRANSACTIONS } from '@/constants';
import { mapGetters } from 'vuex';

const components = {};
TRANSACTIONS.SUPPORTED_TYPES.forEach((component) => {
  components[component.name] = () => ({
    component: import(`./msgs/${component.name}.vue`),
    loading: BasePlaceholderComponentLoading,
    error: BasePlaceholderComponentError,
    delay: 0,
    timeout: 5000,
  });
});

export default {
  name: 'TransactionsViewDetailContent',
  components: {
    ...components,
    MsgDefault,
    TheTransactionsCommonContent,
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
        (component) => component.text === message['@type']
      );
      return component ? component.name : MsgDefault.name;
    },
  },
};
</script>
