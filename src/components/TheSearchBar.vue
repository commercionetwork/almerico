<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="query"
      :placeholder="$t('msgs.placeholderSearchBar')"
      append-icon="mdi-magnify"
      @click:append="onSubmit"
    />
  </v-form>
</template>

<script>
import { CONFIG, ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'TheSearchBar',
  data: () => ({
    query: '',
  }),
  methods: {
    onSubmit() {
      const validatorRegEx = regExpBuilder.getAddressRegExp(
        CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS
      );
      const accountRegEx = regExpBuilder.getAddressRegExp(
        CONFIG.PREFIXES.ACCOUNT.ADDRESS
      );
      const hashRegEx = regExpBuilder.getHashRegExp();
      const heightRegEx = regExpBuilder.getHeightRegExp();

      let routeName = null;
      if (validatorRegEx.test(this.query)) {
        routeName = ROUTES.NAME.VALIDATORS_DETAIL;
      } else if (accountRegEx.test(this.query)) {
        routeName = ROUTES.NAME.ACCOUNT;
      } else if (hashRegEx.test(this.query)) {
        routeName = ROUTES.NAME.TRANSACTIONS_DETAIL;
      } else if (heightRegEx.test(this.query)) {
        routeName = ROUTES.NAME.BLOCKS_DETAIL;
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
