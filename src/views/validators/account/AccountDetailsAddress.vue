<template>
  <v-card outlined>
    <v-row>
      <v-col cols="12" md="6">
        <div class="pa-3 d-flex justify-center align-end">
          <span class="text-capitalize" v-text="'address:'" />
          <span
            class="pl-2 text-break font-weight-bold address-font"
            v-text="address"
          />
          <div class="ml-3">
            <v-btn class="pa-1" color="black" icon @click.stop="dialog = true">
              <span class="pa-2 white">
                <v-icon large>mdi-qrcode</v-icon>
              </span>
            </v-btn>
            <AccountDetailsQRCode v-model="dialog" :address="address" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <div class="pa-3 d-flex justify-center align-end">
          <span class="text-capitalize" v-text="'membership:'" />
          <router-link
            v-if="txhash !== ''"
            class="pl-2 text-capitalize font-weight-bold secondary--text"
            :to="{
              name: ROUTES.NAMES.TRANSACTIONS_DETAILS,
              params: { id: txhash },
            }"
            v-text="membershipText"
          />
          <span
            v-else
            class="pl-2 text-capitalize font-weight-bold"
            v-text="membershipText"
          />
          <div class="ml-3 white">
            <v-icon class="px-1" :color="membershipColor" large>
              mdi-card-account-details
            </v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import AccountDetailsQRCode from './AccountDetailsQRCode';

import { mapGetters } from 'vuex';
import { ACCOUNT, ROUTES } from '@/constants';

export default {
  name: 'AccountDetailsAddress',
  components: {
    AccountDetailsQRCode,
  },
  data: () => ({
    ROUTES,
    dialog: false,
  }),
  computed: {
    ...mapGetters('account', {
      buyMembershipTx: 'buyMembershipTx',
      membership: 'membership',
    }),
    address() {
      return this.$route.params.id;
    },
    membershipColor() {
      const index = ACCOUNT.MEMBERSHIPS.findIndex(
        (membership) => membership.name === this.membershipText,
      );
      return index !== -1 ? ACCOUNT.MEMBERSHIPS[index]['color'] : '#CCEEFF';
    },
    membershipText() {
      return Object.keys(this.membership).length > 0
        ? this.membership.membership_type
        : `none`;
    },
    txhash() {
      return this.buyMembershipTx && this.buyMembershipTx.txhash
        ? this.buyMembershipTx.txhash
        : '';
    },
  },
};
</script>

<style scoped>
.word-break {
  white-space: normal;
  word-break: break-all;
}

.address-font {
  font-family: monospace;
  font-size: 0.85rem;
}
</style>
