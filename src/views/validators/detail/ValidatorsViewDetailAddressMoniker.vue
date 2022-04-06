<template>
  <div class="d-flex flex-row justify-start align-center">
    <span>
      <v-btn icon @click="handleBookmark(detail.operator_address)">
        <v-icon color="amber darken-2" left size="30">
          {{ bookmarkIcon }}
        </v-icon>
      </v-btn>
    </span>
    <span class="text-h5 text-capitalize font-weight-bold" v-text="moniker" />
  </div>
</template>

<script>
import { mdiStar, mdiStarOutline } from '@mdi/js';

export default {
  name: 'ValidatorsViewDetailAddressMoniker',
  props: {
    detail: {
      type: Object,
      required: true,
      note: 'The validator data',
    },
    isBookmark: {
      type: Boolean,
      default: false,
      note: 'The validator status',
    },
  },
  emits: [`handle-bookmark`],
  computed: {
    bookmarkIcon() {
      return this.isBookmark ? mdiStar : mdiStarOutline;
    },
    moniker() {
      return this.detail.description.moniker || '';
    },
  },
  methods: {
    handleBookmark(address) {
      this.$emit('handle-bookmark', address);
    },
  },
};
</script>
