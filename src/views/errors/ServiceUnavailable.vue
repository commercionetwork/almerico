<template>
  <v-container>
    <v-card color="transparent" outlined>
      <v-alert border="left" prominent text type="error">
        <span class="text-h6">Service Unavailable</span>
      </v-alert>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ServiceUnavailable",
  description: "503 page"
};
</script>
