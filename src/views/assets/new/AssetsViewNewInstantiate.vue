<template>
  <v-card-actions>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2" md="4" offset-md="4">
        <v-btn block color="primary" depressed>
          <span v-text="$t('labels.instantiateContract')" />
        </v-btn>
      </v-col>
    </v-row>
  </v-card-actions>
</template>

<script>
export default {
  name: 'AssetsViewNewInstantiate',
};
</script>
