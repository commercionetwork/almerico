<template>
  <div class="container com-container">
    <router-view />
    <div class="row d-flex justify-content-start">
      <router-link
        :to="toStart"
        v-html="$t('messages.toStart')"
      />
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { localizedRoute } from "Utils";

export default {
  name: "ErrorLayout",
  description: "Layout for error",
  computed: {
    toStart() {
      return localizedRoute(ROUTE_NAMES.HOME, this.$i18n.locale);
    }
  }
};
</script>
