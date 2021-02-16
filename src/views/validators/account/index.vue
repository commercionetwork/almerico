<template>
  <v-row v-if="isLoading">
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
      <AccountDetailsHeader />
      <v-row v-if="error !== null">
        <v-col cols="12">
          <v-alert border="left" prominent text type="error">
            <span class="text-body-1" v-text="JSON.stringify(error)" />
          </v-alert>
        </v-col>
      </v-row>
      <div v-else>
        <AccountDetailsBody class="py-1" />
        <AccountDetailsFooter class="py-1" :address="address" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import AccountDetailsBody from './AccountDetailsBody';
import AccountDetailsFooter from './AccountDetailsFooter';
import AccountDetailsHeader from './AccountDetailsHeader';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountDetails',
  components: {
    AccountDetailsBody,
    AccountDetailsFooter,
    AccountDetailsHeader,
  },
  computed: {
    ...mapGetters('account', {
      isLoading: 'isLoading',
      error: 'error',
    }),
    address() {
      return this.$route.params.id;
    },
  },
  watch: {
    $route(to) {
      this.getAccount(to.params.id);
    },
  },
  methods: {
    ...mapActions('account', {
      getAccount: 'getAccount',
    }),
  },
  created() {
    if (this.address) this.getAccount(this.address);
  },
};
</script>
