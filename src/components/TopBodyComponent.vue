<template>
  <v-row class="py-3 align-end">
    <v-col cols="12" :sm="optionalInfo ? 3 : 4">
      <v-card outlined>
        <slot name="left-info" />
      </v-card>
    </v-col>
    <v-col cols="12" :sm="optionalInfo ? 3 : 4">
      <v-card outlined>
        <slot name="center-info" />
      </v-card>
    </v-col>
    <v-col cols="12" :sm="optionalInfo ? 3 : 4">
      <v-card outlined>
        <slot name="right-info" />
      </v-card>
    </v-col>
    <v-col v-if="optionalInfo" cols="12" sm="3">
      <v-card outlined>
        <slot name="optional-info" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TopBodyComponent',
  props: {
    optionalInfo: {
      type: Boolean,
      default: false,
      note: 'Enable the fourth card',
    },
  },
};
</script>
