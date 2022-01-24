<template>
  <v-col cols="12" md="6">
    <v-card outlined>
      <v-card-title v-text="type" />
      <v-card-subtitle v-text="$t('labels.msgType')" />
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
                  class="pr-1 text-capitalize font-weight-bold"
                  v-text="$t('labels.status')"
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
                  class="pr-1 text-capitalize font-weight-bold"
                  v-text="$t('labels.hash')"
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
  name: 'HomeGridListItemComponent',
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
    hash() {
      return this.transaction.txhash;
    },
    status() {
      return this.transaction.code
        ? this.$t('msgs.failed')
        : this.$t('msgs.success');
    },
    time() {
      return dateHandler.getFormattedDifference(
        new Date(this.transaction.timestamp),
        new Date(),
      );
    },
    type() {
      return txHandler.getType_current(
        this.transaction.tx.body.messages,
        this.$t('labels.multiTypes'),
      );
    },
    txLink() {
      return {
        name: ROUTES.NAME.TRANSACTIONS_DETAIL,
        params: { id: this.hash },
      };
    },
  },
};
</script>
