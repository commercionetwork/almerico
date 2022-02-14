<template>
  <v-card-text class="d-flex flex-row justify-space-between align-center">
    <div>
      <div class="text-h5 text-capitalize font-weight-bold" v-text="moniker" />
      <div>
        <v-icon small left :color="isActive ? 'info' : 'warning'">
          mdi-hubspot
        </v-icon>
        <span class="text-caption" :class="statusClass" v-text="statusText" />
      </div>
    </div>
    <div>
      <v-btn icon @click="handleBookmark(detail.operator_address)">
        <v-icon size="35" color="amber darken-2">
          {{ bookmarkIcon }}
        </v-icon>
      </v-btn>
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
    statusClass() {
      return this.isActive ? 'info--text' : 'warning--text';
    },
    statusText() {
      return this.isActive
        ? this.$t('labels.active')
        : this.$t('labels.inactive');
    },
  },
  methods: {
    handleBookmark(address) {
      this.$emit('handleBookmark', address);
    },
  },
};
</script>
