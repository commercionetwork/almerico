<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="query"
      placeholder="Search Address, Block Height, TxHash"
      append-icon="mdi-magnify"
      @click:append="onSubmit"
    />
  </v-form>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'SearchBar',
  data: () => ({
    query: '',
  }),
  methods: {
    onSubmit() {
      const validatorRegEx = new RegExp(
        this.$config.generic.prefixes.validator.operator.address + '.*$',
        'igm'
      );
      const accountRegEx = new RegExp(
        this.$config.generic.prefixes.account.address + '.*$',
        'igm'
      );
      const hashRegEx = new RegExp(/[0-9A-F]{64}$/, 'igm');
      const heightRegEx = new RegExp(/[0-9]{1,}$/, 'igm');

      let routeName = null;
      if (validatorRegEx.test(this.query)) {
        routeName = ROUTES.NAMES.VALIDATORS_DETAILS;
      } else if (accountRegEx.test(this.query)) {
        routeName = ROUTES.NAMES.VALIDATORS_ACCOUNT;
      } else if (hashRegEx.test(this.query)) {
        routeName = ROUTES.NAMES.TRANSACTIONS_DETAILS;
      } else if (heightRegEx.test(this.query)) {
        routeName = ROUTES.NAMES.BLOCKS_DETAILS;
      }

      if (routeName) {
        this.$router.push({
          name: routeName,
          params: {
            id: this.query,
          },
        });
      }
    },
  },
};
</script>
