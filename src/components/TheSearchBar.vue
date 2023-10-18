<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      :append-icon="mdiMagnify"
      :placeholder="$t('msgs.placeholderSearchBar')"
      v-model="query"
      @click:append="onSubmit"
    />
  </v-form>
</template>

<script>
import { CONFIG, ROUTES } from '@/constants';
import { mdiMagnify } from '@mdi/js';
import { bech32Manager, regExpBuilder } from '@/utils';

export default {
  name: 'TheSearchBar',
  data() {
    return {
      mdiMagnify,
      query: '',
    };
  },
  methods: {
    onSubmit() {
      const prefix = bech32Manager.extractPrefix(this.query);
      const hashRegEx = regExpBuilder.getHashRegExp();
      const heightRegEx = regExpBuilder.getHeightRegExp();
      let routeName = null;
      if (prefix === CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS) {
        routeName = ROUTES.NAME.VALIDATORS_DETAIL;
      } else if (prefix === CONFIG.PREFIXES.ACCOUNT.ADDRESS) {
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
