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
          {{ mdiCardAccountDetails }}
        </v-icon>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import { ACCOUNT, ROUTES } from '@/constants';
import { mapGetters } from 'vuex';
import { maxBy } from 'lodash';
import { mdiCardAccountDetails } from '@mdi/js';

export default {
  name: 'AccountViewContentTopLeftMembership',
  data: () => ({
    ROUTES,
    mdiCardAccountDetails,
  }),
  computed: {
    ...mapGetters('account', ['membership', 'membershipTxs']),
    membershipColor() {
      const index = this.membership
        ? ACCOUNT.MEMBERSHIPS.findIndex(
            (membership) => membership.name === this.membershipText
          )
        : -1;
      return index > -1 ? ACCOUNT.MEMBERSHIPS[index]['color'] : '#b3d9ff';
    },
    membershipText() {
      return this.membership
        ? this.membership.membership_type
        : this.$t('labels.none');
    },
    lastTransaction() {
      return this.membershipTxs.length > 0
        ? maxBy(this.membershipTxs, (o) => o.timestamp)
        : null;
    },
    txhash() {
      return this.lastTransaction ? this.lastTransaction.txhash : '';
    },
  },
};
</script>
