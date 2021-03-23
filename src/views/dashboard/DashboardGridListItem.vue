<template>
  <v-col cols="12" md="6">
    <v-card elevation="2">
      <v-card-title v-text="type" />
      <v-card-subtitle v-text="'Msg type'" />
      <v-card-text>
        <v-list dense class="text-break">
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="text-capitalize font-weight-bold"
                  v-text="'time:'"
                />
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
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
                  class="text-capitalize font-weight-bold"
                  v-text="'status:'"
                />
                <span
                  class="pl-1"
                  :class="transaction.code ? 'error--text' : 'info--text'"
                  v-text="status"
                />
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="text-capitalize font-weight-bold"
                  v-text="'hash:'"
                />
                <router-link
                  class="pl-1 text-decoration-none text-overline"
                  v-text="hash"
                  :to="txLink"
                />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { ROUTES } from '@/constants';
import { dateHandler, txHandler } from '@/utils';

export default {
  name: 'DashboardGridListItem',
  props: {
    transaction: {
      type: Object,
      default: () => ({}),
      note: 'The item to display',
    },
  },
  computed: {
    date() {
      return this.transaction
        ? new Date(this.transaction.timestamp).toLocaleString()
        : '';
    },
    hash() {
      return this.transaction ? this.transaction.txhash : '';
    },
    status() {
      return this.transaction.code ? 'Failed' : 'Success';
    },
    time() {
      return this.transaction
        ? dateHandler.getFormattedDifference(
            new Date(this.transaction.timestamp),
            new Date()
          )
        : '';
    },
    msgs() {
      return this.transaction ? this.transaction.tx.value.msg : [];
    },
    type() {
      return this.transaction ? txHandler.getType(this.msgs) : '';
    },
    txLink() {
      return this.hash
        ? {
            name: ROUTES.NAMES.TRANSACTIONS_DETAILS,
            params: { id: this.hash },
          }
        : {};
    },
  },
};
</script>
