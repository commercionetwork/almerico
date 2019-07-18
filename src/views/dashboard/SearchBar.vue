<template>
  <form
    @submit.prevent="onSubmit"
    class="w-100"
  >
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control com-font-s14-w400"
        :placeholder="$t('messages.search')"
        v-model="query"
        aria-label="Search"
        aria-describedby="search-field"
        ref="inputSearch"
      >
      <div class="input-group-append">
        <span
          class="input-group-text bg-light com-pointer"
          id="search-field"
          @click="onSubmit"
        >
          <Icon
            name="search"
            scale="1"
            class="text-primary"
          />
        </span>
      </div>
    </div>
  </form>
</template>

<script>
import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/search";

import { PREFIX, ROUTE_NAMES } from "Constants";

export default {
  name: "SearchBar",
  description: "Display the dashboard search bar",
  components: {
    Icon
  },
  data() {
    return {
      query: ""
    };
  },
  methods: {
    onSubmit() {
      const validatorRegEx = new RegExp(PREFIX.COMNETVALOPER + ".*$", "igm");
      const accountRegEx = new RegExp(PREFIX.COMNET + ".*$", "igm");
      const hashRegEx = new RegExp(/[0-9A-F]{64}$/, "igm");
      const heightRegEx = new RegExp(/[0-9]{1,}$/, "igm");

      let routeName = null;
      if (validatorRegEx.test(this.query)) {
        routeName = ROUTE_NAMES.VALIDATOR_DETAILS;
      } else if (accountRegEx.test(this.query)) {
        routeName = ROUTE_NAMES.ACCOUNT_DETAILS;
      } else if (hashRegEx.test(this.query)) {
        routeName = ROUTE_NAMES.TRANSACTION_DETAILS;
      } else if (heightRegEx.test(this.query)) {
        routeName = ROUTE_NAMES.BLOCK_DETAILS;
      }

      if (routeName) {
        this.$router.push({
          name: routeName,
          params: {
            id: this.query,
            lang: this.$i18n.locale
          }
        });
      }
    }
  },
  mounted() {
    this.$refs.inputSearch.focus();
  }
};
</script>
