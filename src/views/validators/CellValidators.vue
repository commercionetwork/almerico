<template>
  <HeaderCell :chart='false'>
    <div slot="header">
      <span>
        <Icon
          name="pollPeople"
          scale="1"
        />
      </span>
      <span
        class="pl-1"
        v-text="'Validators'"
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
import "Assets/img/icons/poll-people";

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
