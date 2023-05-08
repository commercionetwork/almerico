<template>
  <v-card-text class="d-flex justify-center">
    <v-menu open-on-hover offset-x style="max-width: 600px">
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <span v-text="btnLabel" />
          <v-icon right color="primary">{{ mdiChevronDown }}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item @click="onFilter(false)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span v-text="$t(`labels.received`)" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowBottomLeftThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(true)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span v-text="$t(`labels.sent`)" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowTopRightThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-card-text>
</template>

<script>
import {
  mdiArrowBottomLeftThick,
  mdiArrowTopRightThick,
  mdiChevronDown,
} from '@mdi/js';

export default {
  name: 'AccountViewDashboardTransactionsFilter',
  data() {
    return {
      mdiArrowBottomLeftThick,
      mdiArrowTopRightThick,
      mdiChevronDown,
      isSent: true,
    };
  },
  computed: {
    btnLabel() {
      return this.isSent
        ? this.$t('labels.sentTxs')
        : this.$t('labels.receivedTxs');
    },
  },
  methods: {
    onFilter(filter) {
      this.isSent = filter;
      this.$emit('filter-txs', filter);
    },
  },
};
</script>
