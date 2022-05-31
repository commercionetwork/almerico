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
import { mapGetters } from 'vuex';
import {
  mdiAccountNetwork,
  mdiCloseNetwork,
  mdiStar,
  mdiStarOutline,
} from '@mdi/js';

export default {
  name: 'ValidatorsViewDetailIdentityMoniker',
  props: {
    isBookmark: {
      type: Boolean,
      default: false,
      note: 'The validator status',
    },
  },
  emits: [`handle-bookmark`],
  data() {
    return {
      mdiAccountNetwork,
      mdiCloseNetwork,
    };
  },
  computed: {
    ...mapGetters('validators', ['detail']),
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
  methods: {
    handleBookmark() {
      this.$emit('handle-bookmark');
    },
  },
};
</script>
