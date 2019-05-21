<template>
  <nav class="navbar fixed-top navbar-toggleable-md navbar-dark d-flex align-items-center">
    <button 
      type="button" 
      class="navbar-toggler navbar-toggler-right m-0 p-0" 
      @click.stop="toggleSidebar"
    >
      <Icon
        name="bars"
        class="navbar-icon ml-3 my-1"
      />
    </button>
    <router-link
      class="navbar-brand"
      :to="toSection(ROUTE_NAMES.HOME)"
    >
      <img
        class="com-logo m-1"
        :src="logoSrc"
      />
    </router-link>
  </nav>
</template>

<script>
import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/bars";

import { ROUTE_NAMES } from "Constants";
import { localizedRoute } from "Utils";

export default {
  name: "NavBar",
  description: "Navigation bar of the application",
  components: {
    Icon
  },
  props: {
    toggleSidebar: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      ROUTE_NAMES
    }
  },
  computed: {
    logoSrc() {
      return require("Assets/img/logo-white.png");
    },
  },
  methods: {
    toSection(route) {
      return localizedRoute(route, this.$i18n.locale);
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 30px;
  padding: 0;
  background-color: $primary;
  @include z-index(navbar);
}
.navbar-icon {
  color: $white;
}
.navbar-brand {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.com-logo {
  max-height: 25px;
  width: auto;
}
</style>
