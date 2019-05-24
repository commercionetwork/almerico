<template>
  <div
    id="sidebar-slideout"
    class="sidebar-slideout"
    :class="{ open: sideBarOpen }"
    v-click-outside="closeSidebar"
  >
    <!-- dashboard -->
    <div
      class="m-4"
      @click="closeSidebar"
    >
      <router-link :to="toSection(ROUTE_NAMES.DASHBOARD)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="thLarge"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 text-secondary com-font-s14-w700"
            v-html="$t('titles.dashboard')"
          />
        </div>
      </router-link>
    </div>
    <!-- validators -->
    <div
      class="m-4"
      @click="closeSidebar"
    >
      <router-link :to="toSection(ROUTE_NAMES.VALIDATORS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="pollPeople"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 text-secondary com-font-s14-w700"
            v-html="$t('titles.validators')"
          />
        </div>
      </router-link>
    </div>
    <!-- blocks -->
    <div
      class="m-4"
      @click="closeSidebar"
    >
      <router-link :to="toSection(ROUTE_NAMES.BLOCKS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="shapes"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 text-secondary com-font-s14-w700"
            v-html="$t('titles.blocks')"
          />
        </div>
      </router-link>
    </div>
    <!-- transactions -->
    <div
      class="m-4"
      @click="closeSidebar"
    >
      <router-link :to="toSection(ROUTE_NAMES.TRANSACTIONS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="exchangeAlt"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 text-secondary com-font-s14-w700"
            v-html="$t('titles.transactions')"
          />
        </div>
      </router-link>
    </div>
    <!-- votings -->
    <div
      class="m-4"
      @click="closeSidebar"
    >
      <router-link :to="toSection(ROUTE_NAMES.VOTINGS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="poll"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 text-secondary com-font-s14-w700"
            v-html="$t('titles.votings')"
          />
        </div>
      </router-link>
    </div>

  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";
import { localizedRoute } from "Utils";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/exchange-alt";
import "Assets/img/icons/poll-people";
import "Assets/img/icons/poll";
import "Assets/img/icons/shapes";
import "Assets/img/icons/th-large";

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
};
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
