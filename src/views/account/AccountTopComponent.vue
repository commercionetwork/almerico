<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <AccountAddressComponent
            :address="address"
            v-on:open-qrcode="onOpenQrcode"
          />
          <AccountQRCodeComponent v-model="dialog" :address="address" />
        </v-col>
        <v-col cols="12" md="6">
          <AccountMembershipComponent />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import AccountAddressComponent from './AccountAddressComponent.vue';
import AccountMembershipComponent from './AccountMembershipComponent.vue';
import AccountQRCodeComponent from './AccountQRCodeComponent.vue';

export default {
  name: 'AccountTopComponent',
  components: {
    AccountAddressComponent,
    AccountMembershipComponent,
    AccountQRCodeComponent,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    address() {
      return this.$route.params.id;
    },
  },
  methods: {
    onOpenQrcode() {
      this.dialog = true;
    },
  },
};
</script>
