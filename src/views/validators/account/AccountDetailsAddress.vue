<template>
  <v-card outlined>
    <v-row>
      <v-col cols="12" md="6">
        <div class="pa-3 d-flex justify-center align-center">
          <span class="text-subtitle-1 text-capitalize" v-text="'address:'" />
          <span class="pl-3 font-weight-bold" v-text="address" />
          <div class="pl-3">
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
        <div class="pa-3 d-flex justify-center align-center">
          <span class="text-subtitle-1 text-capitalize" v-text="'membership:'" />
          <span class="pl-3 font-weight-bold" v-text="membershipText" />
          <div class="pl-3 white">
            <v-icon class="mx-1" :color="membershipColor" large>
              mdi-card-account-details
            </v-icon>
          </div>
        </div>
      </v-col>
    </v-row>
    <!-- <v-toolbar flat dense>
      <v-toolbar-title class="text-capitalize" v-text="'address'" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn class="pa-1" color="black" icon @click.stop="dialog = true">
          <span class="pa-2 white">
            <v-icon large>mdi-qrcode</v-icon>
          </span>
        </v-btn>
        <AccountDetailsQRCode v-model="dialog" :address="address" />
      </v-toolbar-items>
      <template v-slot:extension>
        <div class="py-3 word-break text-subtitle-2" v-text="address" />
      </template>
    </v-toolbar>
    <v-card-subtitle class="text-h6 text-capitalize" v-text="'membership'" />
    <v-card-text>
      <v-layout row align-center class="pa-3">
        <div class="white">
          <v-icon class="mx-1" :color="membershipColor" large>
            mdi-card-account-details
          </v-icon>
        </div>
        <div
          class="ml-2 text-capitalize font-weight-bold"
          v-text="membershipText"
        />
      </v-layout>
    </v-card-text> -->
  </v-card>
</template>

<script>
import AccountDetailsQRCode from './AccountDetailsQRCode';

import { mapGetters } from 'vuex';
import { ACCOUNT } from '@/constants';

export default {
  name: 'AccountDetailsAddress',
  components: {
    AccountDetailsQRCode,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters('account', {
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
  },
};
</script>

<style scoped>
.word-break {
  white-space: normal;
  word-break: break-all;
}
</style>
