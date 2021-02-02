<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'from address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: fromAddress },
              }"
              v-text="fromAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'to address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: toAddress },
              }"
              v-text="toAddress"
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
  name: 'MsgSend',
  description: 'Display a send transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a send message',
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
    fromAddress() {
      return this.message.value.from_address
        ? this.message.value.from_address
        : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    toAddress() {
      return this.message.value.to_address
        ? this.message.value.to_address
        : '-';
    },
  },
};
</script>
