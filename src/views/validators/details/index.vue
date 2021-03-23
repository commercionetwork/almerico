<template>
  <v-row v-if="isLoading" data-test="loading">
    <v-col cols="12" class="pa-5">
      <v-progress-linear
        indeterminate
        rounded
        color="primary"
        height="25"
        value="10"
      ></v-progress-linear>
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col cols="12">
      <ValidatorDetailsHeader />
      <v-row v-if="error !== null">
        <v-col cols="12" v-if="error.status === 404" data-test="not-found">
          <v-alert border="left" prominent text type="info">
            <span class="text-body-1" v-text="infoMessage" />
          </v-alert>
        </v-col>
        <v-col cols="12" v-else data-test="error">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="JSON.stringify(error)" />
          </v-alert>
        </v-col>
      </v-row>
      <ValidatorDetailsBody
        v-else
        class="py-1"
        :account="account"
        :operator="operator"
        :delegations="delegations"
        data-test="content"
      />
    </v-col>
  </v-row>
</template>

<script>
import ValidatorDetailsBody from './ValidatorDetailsBody';
import ValidatorDetailsHeader from './ValidatorDetailsHeader';

import { mapActions, mapGetters } from 'vuex';
import { bech32Manager, ValidatorDelegationsHandler } from '@/utils';

export default {
  name: 'ValidatorDetails',
  components: {
    ValidatorDetailsBody,
    ValidatorDetailsHeader,
  },
  computed: {
    ...mapGetters('validators', {
      error: 'error',
      isLoading: 'isLoading',
      details: 'details',
    }),
    address() {
      return this.$route.params.id;
    },
    account() {
      const hexValue = bech32Manager.decode(this.operator);
      return bech32Manager.encode(
        hexValue,
        this.$config.generic.prefixes.account.address
      );
    },
    delegations() {
      return this.details
        ? ValidatorDelegationsHandler.setAddress(this.account)
            .setDelegations(this.details.delegations)
            .get()
        : {};
    },
    infoMessage() {
      return 'No validators with this id';
    },
    operator() {
      return this.details ? this.details.operator_address : '';
    },
  },
  watch: {
    $route(to) {
      this.getValidatorData({ address: to.params.id });
    },
  },
  methods: {
    ...mapActions('validators', {
      getValidatorData: 'getValidatorData',
    }),
  },
  created() {
    if (this.address != null) {
      this.getValidatorData({ address: this.address });
    }
  },
};
</script>
