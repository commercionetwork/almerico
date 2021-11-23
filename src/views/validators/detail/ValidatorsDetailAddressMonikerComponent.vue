<template>
  <v-card-text class="d-flex flex-row justify-space-between align-center">
    <div>
      <div class="text-h5 text-capitalize font-weight-bold" v-text="moniker" />
      <div
        class="text-caption font-italic"
        :class="isActive ? 'info--text' : 'warning--text'"
        v-text="isActive ? $t('labels.active') : $t('labels.inactive')"
      />
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
  },
  computed: {
    isActive() {
      return this.detail.status === 3;
    },
    moniker() {
      return this.detail.description.moniker;
    },
  },
};
</script>
