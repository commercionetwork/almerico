<template>
  <HeaderCell :chart='false'>
    <div slot="header">
      <span>
        <Icon
          name="users-cog"
          scale="1"
        />
      </span>
      <span
        class="pl-1"
         v-text="$t('labels.validators')"
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
import "vue-awesome/icons/users-cog";

import { mapGetters } from "vuex";

export default {
  name: "CellValidators",
  description: "Display the validators",
  components: {
    HeaderCell,
    Icon
  },
  computed: {
    ...mapGetters("validators", {
      validators: "validators"
    }),
    unjailedValidators() {
      const unjaileds = this.validators.filter(validator => !validator.jailed);
      return unjaileds.length;
    },
    proportion() {
      return `${this.unjailedValidators}/${this.validators.length}`;
    }
  }
};
</script>
