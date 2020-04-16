<template>
  <div class="dropdown">
    <h2
      class=" dropdown-toggle text-primary com-font-s16-w700"
      v-html="currentItem.label"
      id="dropdownMenu"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <ul
      class="dropdown-menu com-font-s14-w400"
      aria-labelledby="dropdownMenu"
    >
      <li
        v-for="item in filterItems"
        :key="item.id"
        class="py-2 border-bottom"
      >
        <a
          :href="item.url"
          v-text="item.label"
          class="px-2 com-nowrap"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ChainDropdown",
  description: "Display a drop down to change chain",
  props: {
    currentItem: {
      type: Object,
      required: true,
      note: "Current displayed item"
    },
    items: {
      type: Array,
      deafult: () => [],
      note: "The list of items to display"
    }
  },
  computed: {
    filterItems() {
      return this.items.filter(item => item.key !== this.currentItem.key);
    }
  }
};
</script>