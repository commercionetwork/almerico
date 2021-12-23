<template>
  <v-card-text class="d-flex flex-row justify-space-between align-center">
    <div>
      <div class="text-h5 text-capitalize font-weight-bold" v-text="moniker" />
      <div>
        <span
          class="text-caption font-italic"
          :class="isActive ? 'info--text' : 'warning--text'"
          v-text="isActive ? $t('labels.active') : $t('labels.inactive')"
        />
        <v-btn icon @click="handleBookmark(detail.operator_address)">
          <v-icon small color="amber darken-2">
            {{ bookmarkIcon }}
          </v-icon>
        </v-btn>
      </div>
    </div>
    <div>
      <v-icon size="50" :color="isActive ? 'info' : 'warning'">
        mdi-hubspot
      </v-icon>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: 'ValidatorsDetailAddressMonikerComponent',
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
  computed: {
    bookmarkIcon() {
      return this.isBookmark ? 'mdi-star' : 'mdi-star-outline';
    },
    isActive() {
      return this.detail.status === 3;
    },
    moniker() {
      return this.detail.description.moniker;
    },
  },
  methods: {
    handleBookmark(address) {
      this.$emit('handleBookmark', address);
    },
  },
};
</script>
