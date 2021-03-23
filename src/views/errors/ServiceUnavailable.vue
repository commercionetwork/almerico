<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert border="left" prominent text type="error">
          <span class="text-h6">Service Unavailable</span>
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ServiceUnavailable",
  description: "503 page",
};
</script>