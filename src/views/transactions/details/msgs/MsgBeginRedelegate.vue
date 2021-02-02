<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'delegator address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: delegatorAddress },
              }"
              v-text="delegatorAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'destination validator address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_DETAILS,
                params: { id: validatorDstAddress },
              }"
              v-text="validatorDstAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'source validator address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_DETAILS,
                params: { id: validatorSrcAddress },
              }"
              v-text="validatorSrcAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span class="pr-3 text-capitalize font-weight-bold" v-text="'amount'" />
            {{ amount }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgBeginRedelegate',
  description: 'Display a begin redelegate transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a redelegate message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    amount() {
      return `${this.message.value.amount.amount} ${this.message.value.amount.denom}`;
    },
    delegatorAddress() {
      return this.message.value.delegator_address || '-';
    },
    validatorDstAddress() {
      return this.message.value.validator_dst_address || '-';
    },
    validatorSrcAddress() {
      return this.message.value.validator_src_address || '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
