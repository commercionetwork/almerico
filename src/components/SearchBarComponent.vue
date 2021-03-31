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
import { regExpBuilder } from '@/utils';

export default {
  name: 'SearchBarComponent',
  data: () => ({
    query: '',
  }),
  methods: {
    onSubmit() {
      const validatorRegEx = regExpBuilder.getAddressRegExp(
        this.$config.generic.prefixes.validator.operator.address
      );
      const accountRegEx = regExpBuilder.getAddressRegExp(
        this.$config.generic.prefixes.account.address
      );
      const hashRegEx = regExpBuilder.getHashRegExp();
      const heightRegEx = regExpBuilder.getHeightRegExp();

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
