<template>
  <div
    id="sidebar-slideout"
    class="sidebar-slideout"
    :class="{ open: sideBarOpen }"
    v-click-outside="closeSidebar"
  >
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { localizedRoute } from "Utils";

import Icon from "vue-awesome/components/Icon.vue";

export default {
  name: "SideBar",
  description: "The side bar of the application",
  components: {
    Icon
  },
  props: {
    closeSidebar: {
      type: Function,
      required: true
    },
    sideBarOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ROUTE_NAMES,
      open: false
    };
  },
  computed: {},
  methods: {
    toSection(route) {
      return localizedRoute(route, this.$i18n.locale);
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-slideout {
  position: fixed;
  top: 30px;
  overflow-y: auto;
  width: 300px;
  height: 100vh;
  padding: 10px 10px 10px 10px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  border-top: 1px solid $gray-lighter;
  border-right: 1px solid $gray-lighter;
  background: $white;
  @include z-index(sidebar);
}
.open {
  transform: translateX(0);
}
</style>
