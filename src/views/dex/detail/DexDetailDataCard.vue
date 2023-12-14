<template>
  <v-card outlined>
    <v-card-subtitle>
      <span class="font-weight-bold" v-text="subtitle" />
    </v-card-subtitle>
    <v-card-text class="ml-3">
      <div class="py-1">
        <slot name="data-1" />
      </div>
      <div class="py-1">
        <slot name="data-2" />
      </div>
      <div class="py-1">
        <slot name="data-3" />
      </div>
      <div class="py-1">
        <slot name="data-4" />
      </div>
      <div class="py-1">
        <slot name="data-5" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DexDetailDataCard',
  props: ['subtitle'],
};
</script>
