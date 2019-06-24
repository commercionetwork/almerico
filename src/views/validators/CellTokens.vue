<template>
  <HeaderCell :chart='false'>
    <div slot="header">
      <span>
        <Icon
          name="coins"
          scale="1"
        />
      </span>
      <span
        class="pl-1"
        v-text="'Bonded tokens'"
      />
    </div>
    <div slot="body">
      <span v-text="proportion" />
    </div>
  </HeaderCell>
</template>

<script>
import HeaderCell from "Components/common/HeaderCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/coins";

import { mapGetters } from "vuex";

export default {
  name: "CellTokens",
  description: "Display the bonded tokens",
  components: {
    HeaderCell,
    Icon
  },
  computed: {
    ...mapGetters("stake", {
      pool: "pool"
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
