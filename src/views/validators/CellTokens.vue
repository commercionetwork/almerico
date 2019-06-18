<template>
  <DataCell
    :isFetching="isFetching"
    height="75"
  >
    <div slot="top-left-content">
      <span>
        <Icon
          name="coins"
          scale="1"
        />
      </span>
      <span class="pl-1 com-font-s13-w400">Bonded tokens</span>
    </div>
    <div slot="bottom-left-content">&nbsp;</div>
    <div slot="top-right-content">&nbsp;</div>
    <div
      slot="bottom-right-content"
      class="com-font-s14-w400"
      v-text="proportion"
    />
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/coins";

import { mapGetters } from "vuex";

export default {
  name: "CellTokens",
  description: "Display the bonded tokens",
  components: {
    DataCell,
    Icon
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool",
      isFetching: "isFetching"
    }),
    bonded() {
      return this.pool ? new Number(this.pool.bonded_tokens) : 0;
    },
    notBonded() {
      return this.pool ? new Number(this.pool.not_bonded_tokens) : 0;
    },
    totalToken() {
      return this.bonded + this.notBonded;
    },
    proportion() {
      return `${this.bonded / 1000000000}M/${this.totalToken / 1000000000}M`;
    }
  }
};
</script>
