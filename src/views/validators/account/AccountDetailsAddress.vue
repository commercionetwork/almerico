<template>
  <v-card elevation="2">
    <v-toolbar flat class="py-1">
      <v-toolbar-title>
        Address
        <div class="word-break text-subtitle-2" v-text="address" />
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn class="ml-2" color="black" icon @click.stop="dialog = true">
          <span class="pa-2 white">
            <v-icon large>mdi-qrcode</v-icon>
          </span>
        </v-btn>
        <AccountDetailsQRCode v-model="dialog" :address="address" />
      </v-toolbar-items>
    </v-toolbar>
    <v-card-subtitle class="text-h6 text-capitalize" v-text="'membership'" />
    <v-card-text>
      <v-row align="center">
        <v-col cols="12" md="2">
          <div class="ml-2 text-center white">
            <v-icon :color="membershipColor" large>
              mdi-card-account-details
            </v-icon>
          </div>
        </v-col>
        <v-col cols="12" md="10">
          <div
            class="text-left text-capitalize font-weight-bold"
            v-text="membershipText"
          />
        </v-col>
      </v-row>
    </v-card-text>
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
        (membership) => membership.name === this.membershipText
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
