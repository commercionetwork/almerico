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
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.NATIVE_RECEIVED)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span v-text="$t(`labels.nativeReceived`)" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowBottomLeftThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.NATIVE_SENT)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span v-text="$t(`labels.nativeSent`)" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowTopRightThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.CW20_RECEIVED)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span v-text="$t(`labels.cw20Received`)" />
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ mdiArrowBottomLeftThick }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item @click="onFilter(ACCOUNT.TRANSACTION_TYPES.CW20_SENT)">
          <v-list-item-content>
            <v-list-item-title class="text-caption">
              <span v-text="$t(`labels.cw20Sent`)" />
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
      currentType: ACCOUNT.TRANSACTION_TYPES.NATIVE_SENT,
    };
  },
  computed: {
    caption() {
      switch(this.currentType) {
        case ACCOUNT.TRANSACTION_TYPES.NATIVE_SENT:
          return this.$t('labels.nativeSentTxs');
        case ACCOUNT.TRANSACTION_TYPES.NATIVE_RECEIVED:
          return this.$t('labels.nativeReceivedTxs');
        case ACCOUNT.TRANSACTION_TYPES.CW20_SENT:
          return this.$t('labels.cw20SentTxs');
        case ACCOUNT.TRANSACTION_TYPES.CW20_RECEIVED:
          return this.$t('labels.cw20ReceivedTxs');
        default:
          return this.$t('labels.sentTxs');
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
