<template>
  <v-card elevation="2">
    <v-row>
      <v-col cols="12" md="2">
        <v-layout fill-height column align-center justify-center>
          <v-dialog v-model="dialog" max-width="400">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="ml-2" color="black" icon>
                <span class="pa-2 white">
                  <v-icon large>mdi-qrcode</v-icon>
                </span>
              </v-btn>
            </template>
            <v-card>
              <v-toolbar>
                <v-toolbar-title class="primary--text">QR Code</v-toolbar-title>
                <v-spacer />
                <v-toolbar-items>
                  <v-btn icon color="grey" dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
              <div class="text-center">
                <QrcodeVue :value="address" size="200" level="H" class="py-5" />
                <v-divider />
                <div class="text-caption" v-text="'Scan the address'" />
                <div
                  class="pb-3 text-caption font-weight-bold"
                  v-text="address"
                />
              </div>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-col>
      <v-col cols="12" md="10">
        <v-card-text>
          <div>Address:</div>
          <div class="font-weight-bold text-break" v-text="address" />
        </v-card-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="2">
        <v-layout fill-height column align-center justify-center>
          <span class="ml-2 px-1 white">
            <v-icon :color="membershipColor" large>
              mdi-card-account-details
            </v-icon>
          </span>
        </v-layout>
      </v-col>
      <v-col cols="12" md="10">
        <v-card-text>
          <div>Membership:</div>
          <div
            class="text-capitalize font-weight-bold"
            v-text="membershipText"
          />
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

import { mapGetters } from 'vuex';
import { ACCOUNT } from '@/constants';

export default {
  name: 'AccountDetailsAddress',
  components: {
    QrcodeVue,
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
      return index !== -1
        ? ACCOUNT.MEMBERSHIPS[index]['color']
        : '#CCEEFF';
    },
    membershipText() {
      return Object.keys(this.membership).length > 0
        ? this.membership.membership_type
        : `none`;
    },
  },
};
</script>
