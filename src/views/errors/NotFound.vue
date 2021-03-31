<template>
  <v-container>
    <v-card color="transparent" outlined>
      <v-alert border="left" prominent text type="error">
        <span class="text-h6">Not Found</span>
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'NotFound',
  description: '404 page',
};
</script>
