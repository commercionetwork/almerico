<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <v-card-text class="d-flex flex-row justify-space-between align-center">
      <v-row class="d-flex align-center">
        <v-col cols="12" sm="10" order="2" order-sm="1">
          <ValidatorsViewDetailIdentityMoniker
            :is-bookmark="isBookmark"
            @handle-bookmark="onHandleBookmark"
        /></v-col>
        <v-col
          cols="12"
          sm="2"
          order="1"
          order-sm="2"
          class="d-flex justify-center justify-sm-end"
        >
          <ValidatorsViewDetailIdentityLogo />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="mx-3" />
    <v-card-text>
      <ValidatorsViewDetailIdentityAddress />
    </v-card-text>
  </v-card>
</template>

<script>
import ValidatorsViewDetailIdentityAddress from './ValidatorsViewDetailIdentityAddress.vue';
import ValidatorsViewDetailIdentityLogo from './ValidatorsViewDetailIdentityLogo.vue';
import ValidatorsViewDetailIdentityMoniker from './ValidatorsViewDetailIdentityMoniker.vue';

import validatorsStorageHandler from '../helpers/validatorsStorageHandler';

export default {
  name: 'ValidatorsViewDetailIdentity',
  components: {
    ValidatorsViewDetailIdentityAddress,
    ValidatorsViewDetailIdentityLogo,
    ValidatorsViewDetailIdentityMoniker,
  },
  data() {
    return {
      bookmarks: [],
    };
  },
  computed: {
    address() {
      return this.$route.params.id;
    },
    isBookmark() {
      return (
        this.bookmarks.findIndex((address) => address === this.address) > -1
      );
    },
  },
  created() {
    this.bookmarks = validatorsStorageHandler.get();
  },
  methods: {
    onHandleBookmark() {
      if (this.isBookmark) {
        validatorsStorageHandler.remove(this.address);
      } else {
        validatorsStorageHandler.set(this.address);
      }
      this.bookmarks = validatorsStorageHandler.get();
    },
  },
};
</script>
