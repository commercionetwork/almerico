<template>
  <v-col cols="12" md="6">
    <v-card outlined>
      <v-card-title>
        <span v-text="type" />
      </v-card-title>
      <v-card-subtitle>
        <span v-text="$t('labels.msgType')" />
      </v-card-subtitle>
      <v-card-text>
        <v-list dense class="text-break">
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-1 text-capitalize font-weight-bold"
                  v-text="$t('labels.time')"
                />
                <v-tooltip top>
                  <template #activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" class="pl-1" v-text="time" />
                  </template>
                  <span v-text="date" />
                </v-tooltip>
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-1 text-capitalize font-weight-bold"
                  v-text="$t('labels.status')"
                />
                <span class="pl-1" :class="statusClass" v-text="statusText" />
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-1 text-capitalize font-weight-bold"
                  v-text="$t('labels.hash')"
                />
                <router-link
                  class="pl-1 text-decoration-none text-overline"
                  :to="txLink"
                >
                  <span v-text="transaction.hash" />
                </router-link>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { ROUTES, TRANSACTIONS } from '@/constants';
import { dateHandler } from '@/utils';

export default {
  name: 'HomeViewGridListItem',
  props: {
    transaction: {
      type: Object,
      required: true,
      note: 'The item to display',
    },
  },
  computed: {
    date() {
      return new Date(this.transaction.timestamp).toLocaleString();
    },
    statusClass() {
      return this.transaction.result ? 'info--text' : 'error--text';
    },
    statusText() {
      return this.transaction.result
        ? this.$t('msgs.success')
        : this.$t('msgs.failed');
    },
    time() {
      return dateHandler.getFormattedDifference(
        new Date(this.transaction.timestamp),
        new Date()
      );
    },
    txLink() {
      return {
        name: ROUTES.NAME.TRANSACTIONS_DETAIL,
        params: { id: this.transaction.hash },
      };
    },
    type() {
      if (this.transaction.msgs_number > 1) {
        return this.$t(`labels.${TRANSACTIONS.MULTI_TYPE}`);
      }
      return this.transaction.types[0];
    },
  },
};
</script>
