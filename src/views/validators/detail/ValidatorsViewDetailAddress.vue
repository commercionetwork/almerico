<template>
  <v-card
    outlined
    class="fill-height d-flex flex-column justify-start align-content-center"
  >
    <ValidatorsViewDetailAddressMoniker
      :detail="detail"
      :isBookmark="isBookmark"
      v-on:handleBookmark="onHandleBookmark"
    />
    <v-divider class="mx-3" />
    <v-card-text>
      <div class="px-1">
        <div>
          <span
            class="text-capitalize font-weight-bold"
            v-text="$t('labels.operator')"
          />
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="copyToClipboard">
                <v-icon small>
                  {{ !copied ? 'mdi-content-copy' : 'mdi-check-all' }}
                </v-icon>
              </v-btn>
            </template>
            <span v-text="$t('msgs.copy')" />
          </v-tooltip>
        </div>
        <div class="pl-1 font-monotype" v-text="detail.operator_address" />
      </div>
      <div class="px-1 py-3">
        <div
          class="text-capitalize font-weight-bold"
          v-text="$t('labels.address')"
        />
        <router-link
          class="pl-1 text-decoration-none font-monotype"
          :to="toAccount"
          v-text="account"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import validatorsStorageHandler from '../helpers/validatorsStorageHandler';
import ValidatorsViewDetailAddressMoniker from './ValidatorsViewDetailAddressMoniker.vue';
import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsViewDetailAddress',
  components: { ValidatorsViewDetailAddressMoniker },
  props: ['account'],
  data: () => ({
    copied: false,
    bookmarks: [],
  }),
  computed: {
    ...mapGetters('validators', {
      detail: 'detail',
    }),
    isBookmark() {
      return (
        this.bookmarks.findIndex(
          (address) => address === this.detail.operator_address
        ) > -1
      );
    },
    toAccount() {
      return {
        name: ROUTES.NAME.ACCOUNT,
        params: { id: this.account },
      };
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.detail.operator_address).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1000);
      });
    },
    onHandleBookmark(address) {
      if (this.isBookmark) {
        validatorsStorageHandler.remove(address);
      } else {
        validatorsStorageHandler.set(address);
      }
      this.bookmarks = validatorsStorageHandler.get();
    },
  },
  created() {
    this.bookmarks = validatorsStorageHandler.get();
  },
};
</script>
