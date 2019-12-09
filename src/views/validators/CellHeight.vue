<template>
  <HeaderCell :chart='false'>
    <div slot="header">
      <span>
        <Icon
          name="cubes"
          scale="1"
        />
      </span>
      <span
        class="pl-1"
         v-text="$t('labels.height')"
      />
    </div>
    <div slot="body">
      <span v-text="height" />
    </div>
  </HeaderCell>
</template>

<script>
import HeaderCell from "Components/common/HeaderCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/cubes";

import { mapGetters } from "vuex";

export default {
  name: "CellHeight",
  description: "Display the height",
  components: {
    HeaderCell,
    Icon
  },
  computed: {
    ...mapGetters("blocks", {
      block: "lastBlock"
    }),
    height() {
      return this.block ? this.block.header.height : "-";
    }
  }
};
</script>
