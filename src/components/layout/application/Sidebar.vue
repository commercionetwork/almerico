<template>
  <div
    id="sidebar-slideout"
    class="sidebar-slideout"
    :class="{ open: sideBarOpen }"
    v-click-outside="closeSidebar"
  >
    <!-- chain -->
    <div class="m-4">
      <div class="row d-flex flex-row align-items-center">
        <Icon
          name="compress-arrows-alt"
          scale="1.5"
          class="pr-2 text-black-50"
        />
        <span
          class="flex-grow-1 com-font-s12-w300"
          v-text="chainId"
        />
      </div>
    </div>
    <hr>
    <!-- dashboard -->
    <div
      class="m-4"
      @click="closeSidebar"
    >
      <router-link :to="toSection(ROUTE_NAMES.DASHBOARD)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="th-large"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 com-font-s14-w700"
            v-text="$t('titles.dashboard')"
          />
        </div>
      </router-link>
    </div>
    <!-- validators -->
    <div
      v-if="$config.validators.enabled"
      class="m-4"
      @click="closeSidebar"
      data-test="link-validators"
    >
      <router-link :to="toSection(ROUTE_NAMES.VALIDATORS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="users-cog"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 com-font-s14-w700"
            v-html="$t('titles.validators')"
          />
        </div>
      </router-link>
    </div>
    <!-- blocks -->
    <div
      v-if="$config.blocks.enabled"
      class="m-4"
      @click="closeSidebar"
      data-test="link-blocks"
    >
      <router-link :to="toSection(ROUTE_NAMES.BLOCKS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="shapes"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 com-font-s14-w700"
            v-html="$t('titles.blocks')"
          />
        </div>
      </router-link>
    </div>
    <!-- transactions -->
    <div
      v-if="$config.transactions.enabled"
      class="m-4"
      @click="closeSidebar"
      data-test="link-transactions"
    >
      <router-link :to="toSection(ROUTE_NAMES.TRANSACTIONS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="exchange-alt"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 com-font-s14-w700"
            v-html="$t('titles.transactions')"
          />
        </div>
      </router-link>
    </div>
    <!-- votings -->
    <div
      v-if="$config.votings.enabled"
      class="m-4"
      @click="closeSidebar"
      data-test="link-votings"
    >
      <router-link :to="toSection(ROUTE_NAMES.VOTINGS)">
        <div class="row d-flex flex-row align-items-center">
          <Icon
            name="poll-h"
            scale="1.5"
            class="pr-2 text-primary"
          />
          <span
            class="flex-grow-1 com-font-s14-w700"
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
import { mapGetters } from "vuex";

import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/angle-down";
import "vue-awesome/icons/compress-arrows-alt";
import "vue-awesome/icons/exchange-alt";
import "vue-awesome/icons/poll-h";
import "vue-awesome/icons/shapes";
import "vue-awesome/icons/th-large";
import "vue-awesome/icons/users-cog";

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
  computed: {
    ...mapGetters("chain", {
      info: "nodeInfo",
      isFetching: "isFetching"
    }),
    chainId() {
      const name =
        this.info && this.info.node_info && this.info.node_info.network
          ? this.info.node_info.network
          : "";
      const version =
        this.info &&
        this.info.application_version &&
        this.info.application_version.version
          ? this.info.application_version.version
          : "";
      const fullName = this.info ? `${name} (${version})` : "-";
      return this.isFetching ? this.$t("messages.loading") : fullName;
    }
  },
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
  top: 60px;
  overflow-y: auto;
  width: 300px;
  height: 100vh;
  padding: 10px 10px 10px 10px;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  border-right: 1px solid $gray-light;
  background: $background;
  @include z-index(sidebar);
}
.open {
  transform: translateX(0);
}
</style>
