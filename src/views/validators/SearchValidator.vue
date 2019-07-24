<template>
  <form @submit.prevent="onFilter(status)">
    <div class="row">
      <div class="py-1 col-12 col-md-6">
        <input
          type="text"
          class="form-control com-font-s14-w400"
          :placeholder="$t('messages.searchValidator')"
          v-model="moniker"
          aria-label="Search"
          aria-describedby="search-field"
          ref="inputSearch"
        >
      </div>
      <div class="py-1 col-6 col-md-3">
        <button
          type="button"
          class="btn btn-block px-1 com-font-s14-w700"
          :class="[status ? 'btn-primary' : 'btn-outline-primary']"
          v-html="$t('buttons.active')"
          @click.stop="onFilter(true)"
        />
      </div>
      <div class="py-1 col-6 col-md-3">
        <button
          type="button"
          class="btn btn-block px-1 com-font-s14-w700"
          :class="[!status ? 'btn-primary' : 'btn-outline-primary']"
          v-html="$t('buttons.inactive')"
          @click.stop="onFilter(false)"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "SearchValidator",
  description: "Display input field to search a validator",
  data() {
    return {
      moniker: "",
      status: true
    };
  },
  methods: {
    onFilter(status) {
      this.status = status;
      this.$emit("filter-validators", {
        status: this.status,
        moniker: this.moniker
      });
    }
  },
  mounted() {
    this.$refs.inputSearch.focus();
  }
};
</script>
