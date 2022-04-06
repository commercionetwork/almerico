<template>
  <v-row>
    <v-col cols="12" class="pa-5" v-if="isLoading" data-test="loading">
      <BaseLoadingLinear :height="25" />
    </v-col>
    <v-col
      cols="12"
      class="pa-5"
      v-else-if="!isLoading && error"
      data-test="error"
    >
      <TheAlertNotice kind="warning" :message="$t('msgs.accountNotExist')" />
    </v-col>
    <v-col cols="12" v-else data-test="content">
      <TheHeaderContent :title="$t('titles.accountDetail')" />
      <AccountViewContentTop />
      <AccountViewContentMiddle />
      <AccountViewContentBottom />
    </v-col>
  </v-row>
</template>

<script>
import AccountViewContentBottom from './AccountViewContentBottom.vue';
import AccountViewContentMiddle from './AccountViewContentMiddle.vue';
import AccountViewContentTop from './AccountViewContentTop.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheHeaderContent from '@/components/TheHeaderContent';

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AccountView',
  components: {
    AccountViewContentBottom,
    AccountViewContentMiddle,
    AccountViewContentTop,
    BaseLoadingLinear,
    TheAlertNotice,
    TheHeaderContent,
  },
  props: {
    id: {
      type: String,
      note: "The account id from route's parameter",
    },
  },
  computed: {
    ...mapGetters('account', ['error', 'isLoading']),
  },
  watch: {
    id(value) {
      this.initAccount(value);
    },
  },
  created() {
    this.initAccount(this.id);
  },
  methods: {
    ...mapActions('account', ['initAccount']),
  },
};
</script>
