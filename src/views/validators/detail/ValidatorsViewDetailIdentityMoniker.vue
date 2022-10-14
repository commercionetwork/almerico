<template>
  <v-row>
    <v-col cols="2" xl="1" class="d-flex align-center">
      <v-btn icon @click="handleBookmark">
        <v-icon color="amber darken-2" left size="30">
          {{ bookmarkIcon }}
        </v-icon>
      </v-btn>
    </v-col>
    <v-col cols="10" xl="11" class="d-flex flex-column">
      <div
        class="text-h5 text-capitalize font-weight-bold"
        v-text="detail.moniker"
      />
      <div class="d-flex flex-row">
        <v-icon left size="18" :color="detail.active ? 'success' : 'error'">
          {{ detail.active ? mdiAccountNetwork : mdiCloseNetwork }}
        </v-icon>
        <span class="text-caption" :class="statusClass" v-text="statusText" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiAccountNetwork,
  mdiCloseNetwork,
  mdiStar,
  mdiStarOutline,
} from '@mdi/js';
import { CONFIG } from '@/constants';
import { mapGetters } from 'vuex';
import { storageHandler } from '@/utils';

export default {
  name: 'ValidatorsViewDetailIdentityMoniker',
  data() {
    return {
      bookmarks: [],
      mdiAccountNetwork,
      mdiCloseNetwork,
    };
  },
  computed: {
    ...mapGetters('validators', ['detail']),
    address() {
      return this.$route.params.id;
    },
    isBookmark() {
      return (
        this.bookmarks.findIndex((address) => address === this.address) > -1
      );
    },
    bookmarkIcon() {
      return this.isBookmark ? mdiStar : mdiStarOutline;
    },
    statusClass() {
      return this.detail.active ? 'success--text' : 'error--text';
    },
    statusText() {
      return this.detail.active
        ? this.$t('labels.active')
        : this.$t('labels.inactive');
    },
  },
  created() {
    this.bookmarks = storageHandler.get(CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS);
  },
  methods: {
    handleBookmark() {
      if (this.isBookmark) {
        storageHandler.remove({
          payload: this.address,
          key: CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
        });
      } else {
        storageHandler.set({
          payload: this.address,
          key: CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS,
        });
      }
      this.bookmarks = storageHandler.get(
        CONFIG.BROWSER_STORAGE_KEYS.VALIDATORS
      );
    },
  },
};
</script>
