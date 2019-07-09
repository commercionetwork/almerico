<template>
  <div id="app">
    <Component v-bind:is="currentLayout" />
  </div>
</template>

<script>
import ApplicationLayout from "Components/layout/application/index.vue";
import ErrorLayout from "Components/layout/error/index.vue";
import { ROUTE_NAMES, ROUTES } from "Constants";
import { localizedRoute } from "Utils";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    ApplicationLayout,
    ErrorLayout
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators"
    }),
    currentLayout() {
      const errorComponents = [ROUTES.NOT_FOUND, ROUTES.SERVER_UNREACHABLE];
      const routeWithErrorLayout = this.$route.matched.some(match => {
        return errorComponents.some(route => match.regex.test(route));
      });

      let currentLayout;
      if (routeWithErrorLayout) {
        currentLayout = ErrorLayout;
      } else {
        currentLayout = ApplicationLayout;
      }
      return currentLayout;
    },
    serverReachability() {
      return this.$store.getters.getServerReachability;
    }
  },
  watch: {
    serverReachability: function(value) {
      if (!value)
        this.$router.push(
          localizedRoute(ROUTE_NAMES.SERVER_UNREACHABLE, this.$i18n.locale)
        );
    }
  },
  methods: {
    ...mapActions("tendermint", {
      subNewClient: "subNewClient"
    }),
    ...mapActions("stake", {
      fetchPool: "fetchPool"
    }),
    ...mapActions("validators", {
      getValidators: "getValidators"
    })
  },
  mounted() {
    this.fetchPool();
    this.getValidators();
    this.subNewClient();
  }
};
</script>

<style lang="scss">
@import "assets/scss/custom-bootstrap.scss";
@import "node_modules/bootstrap/scss/bootstrap.scss";
@import "assets/scss/style.scss";
</style>
