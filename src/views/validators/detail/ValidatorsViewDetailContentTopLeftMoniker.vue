<template>
  <div class="d-flex flex-row justify-start align-center">
    <span>
      <v-btn icon @click="handleBookmark">
        <v-icon color="amber darken-2" left size="30">
          {{ bookmarkIcon }}
        </v-icon>
      </v-btn>
    </span>
    <span class="text-h5 text-capitalize font-weight-bold" v-text="moniker" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mdiStar, mdiStarOutline } from '@mdi/js';

export default {
  name: 'ValidatorsViewDetailContentTopLeftMoniker',
  props: {
    isBookmark: {
      type: Boolean,
      default: false,
      note: 'The validator status',
    },
  },
  emits: [`handle-bookmark`],
  computed: {
    ...mapGetters('validators', ['detail']),
    bookmarkIcon() {
      return this.isBookmark ? mdiStar : mdiStarOutline;
    },
    moniker() {
      return this.detail ? this.detail.description.moniker : '';
    },
  },
  methods: {
    handleBookmark() {
      this.$emit('handle-bookmark');
    },
  },
};
</script>
