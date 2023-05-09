<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <v-card-text class="d-flex flex-row justify-space-between align-center">
      <v-row class="d-flex align-center">
        <v-col cols="12" sm="10" order="2" order-sm="1">
          <validators-view-detail-identity-moniker />
        </v-col>
        <v-col
          cols="12"
          sm="2"
          order="1"
          order-sm="2"
          class="d-flex justify-center justify-sm-end"
        >
          <validators-view-detail-identity-logo />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="mx-3" />
    <v-card-text>
      <validators-view-detail-identity-address />
    </v-card-text>
  </v-card>
</template>

<script>
import ValidatorsViewDetailIdentityAddress from './ValidatorsViewDetailIdentityAddress.vue';
import ValidatorsViewDetailIdentityLogo from './ValidatorsViewDetailIdentityLogo.vue';
import ValidatorsViewDetailIdentityMoniker from './ValidatorsViewDetailIdentityMoniker.vue';
export default {
  name: 'ValidatorsViewDetailIdentity',
  components: {
    ValidatorsViewDetailIdentityAddress,
    ValidatorsViewDetailIdentityLogo,
    ValidatorsViewDetailIdentityMoniker,
  },
};
</script>
