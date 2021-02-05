<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'claimant'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: claimantAddress },
              }"
              v-text="claimantAddress"
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
              v-text="'proof'"
            />
            <span v-text="proof" />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span class="pr-3 text-capitalize font-weight-bold" v-text="'id'" />
            {{ id }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'proof key'"
            />
            <span v-text="proofKey" />
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
  name: 'MsgRequestDidPowerUp',
  description: 'Display a request did power up transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a request did power up message',
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
    claimantAddress() {
      return this.message.value.claimant ? this.message.value.claimant : '-';
    },
    id() {
      return this.message.value.id ? this.message.value.id : '-';
    },
    proof() {
      return this.message.value.proof ? this.message.value.proof : '-';
    },
    proofKey() {
      return this.message.value.proof_key ? this.message.value.proof_key : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
