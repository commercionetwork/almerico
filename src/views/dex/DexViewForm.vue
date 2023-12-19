<template>
  <div>{{ list }}}}</div>
</template>

<script>
import { mapGetters } from 'vuex';
import dexViewHelper from './dex-view-helper';

export default {
  name: 'DexViewForm',
  computed: {
    ...mapGetters('dex', ['contracts', 'tokens']),
    list() {
      return dexViewHelper.getItems({
        contracts: this.contracts,
        tokens: this.tokens,
      });
    },
  },
};
</script>
