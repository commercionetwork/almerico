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
         v-text="$t('labels.bonded')"
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
import "vue-awesome/icons/coins";

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
      return this.pool ? parseFloat(this.pool.bonded_tokens) : 0;
    },
    notBonded() {
      return this.pool ? parseFloat(this.pool.not_bonded_tokens) : 0;
    },
    totalToken() {
      return this.bonded + this.notBonded;
    },
    proportion() {
      let bonded = (this.bonded / 1000000000).toFixed(0);
      let total = (this.totalToken / 1000000000).toFixed(0);
      return `${bonded}M/${total}M`;
    }
  }
};
</script>
