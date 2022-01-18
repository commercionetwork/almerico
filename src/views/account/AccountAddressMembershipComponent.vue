<template>
  <v-card-text class="d-flex flex-row justify-space-between align-center">
    <div>
      <router-link
        v-if="txhash"
        class="text-h5 text-capitalize font-weight-bold secondary--text"
        :to="{
          name: ROUTES.NAME.TRANSACTIONS_DETAIL,
          params: { id: txhash },
        }"
        v-text="membershipText"
      />
      <div
        v-else
        class="text-h5 text-capitalize font-weight-bold"
        v-text="membershipText"
      />
      <div class="text-caption font-italic" v-text="$t('titles.membership')" />
    </div>
    <div>
      <v-card color="white" flat class="pa-1">
        <v-icon size="50" :color="membershipColor">
          mdi-card-account-details
        </v-icon>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import { ACCOUNT, ROUTES } from '@/constants';
import { mapGetters } from 'vuex';
import { maxBy } from 'lodash';

export default {
  name: 'AccountAddressMembershipComponent',
  data: () => ({
    ROUTES,
  }),
  computed: {
    ...mapGetters('account', {
      membership: 'membership',
      txs: 'membershipTxs',
    }),
    membershipColor() {
      const index = ACCOUNT.MEMBERSHIPS.findIndex(
        (membership) => membership.name === this.membershipText,
      );
      return index > -1 ? ACCOUNT.MEMBERSHIPS[index]['color'] : '#b3d9ff';
    },
    membershipText() {
      return this.membership
        ? this.membership.membership_type
        : this.$t('labels.none');
    },
    lastTransaction() {
      return maxBy(this.txs, (o) => o.timestamp);
    },
    txhash() {
      return this.lastTransaction ? this.lastTransaction.txhash : '';
    },
  },
};
</script>
