<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <v-card-text class="d-flex flex-row justify-space-between align-center">
      <v-row class="d-flex align-center">
        <v-col cols="10">
          <ValidatorsViewDetailContentTopLeftMoniker
            :is-bookmark="isBookmark"
            @handle-bookmark="onHandleBookmark"
        /></v-col>
        <v-col cols="2">
          <ValidatorsViewDetailContentTopLeftLogo />
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider class="mx-3" />
    <v-card-text>
      <ValidatorsViewDetailContentTopLeftAddress />
    </v-card-text>
  </v-card>
</template>

<script>
import ValidatorsViewDetailContentTopLeftAddress from './ValidatorsViewDetailContentTopLeftAddress.vue';
import ValidatorsViewDetailContentTopLeftLogo from './ValidatorsViewDetailContentTopLeftLogo.vue';
import ValidatorsViewDetailContentTopLeftMoniker from './ValidatorsViewDetailContentTopLeftMoniker.vue';

import validatorsStorageHandler from '../helpers/validatorsStorageHandler';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailContentTopLeft',
  components: {
    ValidatorsViewDetailContentTopLeftAddress,
    ValidatorsViewDetailContentTopLeftLogo,
    ValidatorsViewDetailContentTopLeftMoniker,
  },
  data: () => ({
    bookmarks: [],
  }),
  computed: {
    ...mapGetters('validators', ['detail', 'detailLogo']),
    isBookmark() {
      return this.detail
        ? this.bookmarks.findIndex(
            (address) => address === this.detail.operator_address
          ) > -1
        : false;
    },
  },
  created() {
    this.bookmarks = validatorsStorageHandler.get();
  },
  methods: {
    onHandleBookmark(address) {
      if (this.isBookmark) {
        validatorsStorageHandler.remove(address);
      } else {
        validatorsStorageHandler.set(address);
      }
      this.bookmarks = validatorsStorageHandler.get();
    },
  },
};
</script>
