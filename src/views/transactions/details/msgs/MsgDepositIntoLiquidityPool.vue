<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'depositor'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: depositorAddress },
              }"
              v-text="depositorAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(amount, index) in amounts" :key="index">
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'amount'"
            />
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
  name: 'MsgDepositIntoLiquidityPool',
  description: 'Display a deposit into liquidity pool transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a deposit message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    amounts() {
      let amounts = [];
      for (const amount of this.message.value.amount) {
        amounts.push(`${amount.amount} ${amount.denom}`);
      }
      return amounts;
    },
    depositorAddress() {
      return this.message.value.depositor || '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
