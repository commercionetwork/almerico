<template>
  <nav aria-label="Pagination bar">
    <ul class="pagination pagination-sm justify-content-end">
      <li
        v-if="currentPage !== 1 && previousPage !== 1"
        class="page-item"
        data-test="first-page"
      >
        <span
          class="page-link com-pointer"
          @click.stop="onChangePage(1)"
        >
          <Icon
            name="angle-double-left"
            scale="1"
          />
        </span>
      </li>
      <li
        v-if="hasPreviousPage"
        class="page-item"
        data-test="previous-page"
      >
        <span
          class="page-link com-pointer"
          v-text="previousPage"
          @click.stop="onChangePage(previousPage)"
        />
      </li>
      <li
        class="page-item active"
        aria-current="page"
      >
        <span
          class="page-link"
          v-text="currentPage"
        />
      </li>
      <li
        v-if="hasNextPage"
        class="page-item"
        data-test="next-page"
      >
        <span
          class="page-link com-pointer"
          v-text="nextPage"
          @click.stop="onChangePage(nextPage)"
        />
      </li>
      <li
        v-if="lastPage > 0 && lastPage !== currentPage && nextPage !== lastPage"
        class="page-item"
        data-test="last-page"
      >
        <span
          class="page-link com-pointer"
          @click.stop="onChangePage(lastPage)"
        >
          <Icon
            name="angle-double-right"
            scale="1"
          />
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/angle-double-left";
import "vue-awesome/icons/angle-double-right";

export default {
  name: "Pagination",
  description: "Display the pagination bar",
  components: {
    Icon
  },
  props: {
    limit: {
      Type: Number,
      require: true,
      note: "Max count items per page"
    },
    page: {
      Type: Number,
      require: true,
      note: "Index of current page"
    },
    total: {
      Type: Number,
      require: true,
      note: "Count of all items"
    }
  },
  computed: {
    currentPage() {
      return this.page;
    },
    hasNextPage() {
      return this.limit * this.page < this.total;
    },
    hasPreviousPage() {
      return this.page > 1;
    },
    lastPage() {
      return Math.ceil(this.total / this.limit);
    },
    nextPage() {
      return this.page + 1;
    },
    previousPage() {
      return this.page - 1;
    }
  },
  methods: {
    onChangePage(page) {
      this.$emit("change-page", page);
    }
  }
};
</script>
