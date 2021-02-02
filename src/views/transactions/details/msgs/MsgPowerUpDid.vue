<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'recipient'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: recipientAddress },
              }"
              v-text="recipientAddress"
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
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'activation reference'"
            />
            {{ activationReference }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'signer'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: signerAddress },
              }"
              v-text="signerAddress"
            />
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
  name: 'MsgPowerUpDid',
  description: 'Display a power up did transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a power up did message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    activationReference() {
      return this.message.value.activation_reference
        ? this.message.value.activation_reference
        : '-';
    },
    amounts() {
      let amounts = [];
      for (const amount of this.message.value.amount) {
        amounts.push(`${amount.amount} ${amount.denom}`);
      }
      return amounts;
    },
    recipientAddress() {
      return this.message.value.recipient ? this.message.value.recipient : '-';
    },
    signerAddress() {
      return this.message.value.signer ? this.message.value.signer : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
