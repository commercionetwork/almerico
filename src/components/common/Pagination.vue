<template>
  <nav aria-label="Pagination bar">
    <ul class="pagination justify-content-end">
      <li
        v-if="currentPage !== 1 && previousPage !== 1"
        class="page-item"
      >
        <span
          class="page-link com-pointer"
          v-text="'1'"
          @click.stop="onSelect(1)"
        />
      </li>
      <li
        v-if="hasPreviousPage"
        class="page-item"
      >
        <span
          class="page-link com-pointer"
          v-text="previousPage"
          @click.stop="onSelect(previousPage)"
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
      >
        <span
          class="page-link com-pointer"
          v-text="nextPage"
          @click.stop="onSelect(nextPage)"
        />
      </li>
      <li
        v-if="lastPage !== currentPage && nextPage !== lastPage"
        class="page-item"
      >
        <span
          class="page-link com-pointer"
          v-text="lastPage"
          @click.stop="onSelect(lastPage)"
        />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  description: "Display the pagination bar",
  props: {
    limit: {
      Type: Number,
      require: true,
      note: "Max count txs per page"
    },
    pageNumber: {
      Type: Number,
      require: true,
      note: "Index of current page"
    },
    pageTotal: {
      Type: Number,
      require: true,
      note: "Count of total pages"
    },
    totalCount: {
      Type: Number,
      require: true,
      note: "Count of all txs"
    }
  },
  computed: {
    currentPage() {
      return this.pageNumber;
    },
    hasNextPage() {
      return this.limit * this.pageNumber < this.totalCount;
    },
    hasPreviousPage() {
      return this.pageNumber > 1;
    },
    lastPage() {
      return this.pageTotal;
    },
    nextPage() {
      return this.pageNumber + 1;
    },
    previousPage() {
      return this.pageNumber - 1;
    }
  },
  methods: {
    onSelect(page) {
      this.$emit("page-selected", page);
    }
  }
};
</script>
