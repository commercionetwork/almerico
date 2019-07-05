<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control com-font-s14-w400"
      :placeholder="$t('messages.search')"
      aria-label="Search"
      aria-describedby="search-field"
    >
    <div class="input-group-append">
      <span
        class="input-group-text bg-light com-pointer"
        id="search-field"
      >
        <Icon
          name="search"
          scale="1"
          class="text-primary"
        />
      </span>
    </div>
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/search";

export default {
  name: "SearchBar",
  description: "Display the dashboard search bar",
  components: {
    Icon
  }
};
</script>
