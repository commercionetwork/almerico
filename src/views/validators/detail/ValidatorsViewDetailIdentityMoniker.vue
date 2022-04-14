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
      <div class="text-h5 text-capitalize font-weight-bold" v-text="moniker" />
      <div class="d-flex flex-row">
        <v-icon left size="18" :color="isActive ? 'success' : 'error'">
          {{ isActive ? mdiAccountNetwork : mdiCloseNetwork }}
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
    moniker() {
      return this.detail ? this.detail.description.moniker : '';
    },
    isActive() {
      return this.detail ? this.detail.status === 3 : false;
    },
    statusClass() {
      return this.isActive ? 'success--text' : 'error--text';
    },
    statusText() {
      return this.isActive
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
