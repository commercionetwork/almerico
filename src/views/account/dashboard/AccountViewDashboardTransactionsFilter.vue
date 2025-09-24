<template>
  <v-card-text class="d-flex flex-row justify-center align-center">
    <span class="text-overline font-weight-bold" v-text="caption" />
    <v-menu bottom offset-y style="max-width: 600px">
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon right>{{ mdiChevronDown }}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          @click="onFilter(ACCOUNT.TRANSACTION_TYPES.RECEIVED)"
        >
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span
                v-text="
                  $t(`labels.${ACCOUNT.TRANSACTION_TYPES.RECEIVED}`)
                "
              />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowBottomLeftThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.SENT)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span
                v-text="$t(`labels.${ACCOUNT.TRANSACTION_TYPES.SENT}`)"
              />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowTopRightThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.CW20_RECEIVED)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span
                v-text="$t(`labels.${ACCOUNT.TRANSACTION_TYPES.CW20_RECEIVED}`)"
              />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowBottomLeftThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.CW20_SENT)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span
                v-text="$t(`labels.${ACCOUNT.TRANSACTION_TYPES.CW20_SENT}`)"
              />
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
import { ACCOUNT } from '@/constants';

export default {
  name: 'AccountViewDashboardTransactionsFilter',
  data() {
    return {
      ACCOUNT,
      mdiArrowBottomLeftThick,
      mdiArrowTopRightThick,
      mdiChevronDown,
      currentType: ACCOUNT.TRANSACTION_TYPES.SENT,
    };
  },
  computed: {
    caption() {
      switch (this.currentType) {
        case ACCOUNT.TRANSACTION_TYPES.SENT:
          return this.$t(`labels.${ACCOUNT.TRANSACTION_TYPES.SENT}`);
        case ACCOUNT.TRANSACTION_TYPES.RECEIVED:
          return this.$t(`labels.${ACCOUNT.TRANSACTION_TYPES.RECEIVED}`);
        case ACCOUNT.TRANSACTION_TYPES.CW20_SENT:
          return this.$t(`labels.${ACCOUNT.TRANSACTION_TYPES.CW20_SENT}`);
        case ACCOUNT.TRANSACTION_TYPES.CW20_RECEIVED:
          return this.$t(`labels.${ACCOUNT.TRANSACTION_TYPES.CW20_RECEIVED}`);
        default:
          return this.$t(`labels.${ACCOUNT.TRANSACTION_TYPES.SENT}`);
      }
    },
  },
  methods: {
    onFilter(type) {
      this.currentType = type;
      this.$emit('filter-txs', type);
    },
  },
};
</script>
