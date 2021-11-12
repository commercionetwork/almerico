<template>
  <div class="d-flex flex-column flex-md-row justify-center align-center">
    <v-card color="white" flat class="pa-1">
      <v-btn class="pa-1" color="black" icon>
        <v-icon :color="membershipColor" large>
          mdi-card-account-details
        </v-icon>
      </v-btn>
    </v-card>
    <div class="pl-md-2 text-center text-md-left">
      <div class="text-capitalize" v-text="$t('labels.membership')" />
      <router-link
        v-if="txhash"
        class="pl-2 text-capitalize font-weight-bold secondary--text"
        :to="{
          name: ROUTES.NAME.TRANSACTIONS_DETAIL,
          params: { id: txhash },
        }"
        v-text="membershipText"
      />
      <div
        v-else
        class="text-capitalize font-weight-bold"
        v-text="membershipText"
      />
    </div>
  </div>
</template>

<script>
import { ACCOUNT, ROUTES } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'AccountMembershipComponent',
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
      return this.txs.reduce(
        (r, o) => (new Date(o.timestamp) > new Date(r.timestamp) ? o : r),
        null,
      );
    },
    txhash() {
      return this.lastTransaction ? this.lastTransaction.txhash : '';
    },
  },
};
</script>
