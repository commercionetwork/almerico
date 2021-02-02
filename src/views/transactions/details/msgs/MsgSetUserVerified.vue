<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'user'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: userAddress },
              }"
              v-text="userAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'verifier'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: verifierAddress },
              }"
              v-text="verifierAddress"
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
  name: 'MsgSetUserVerified',
  description: 'Display a set user verified transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set user verified message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    userAddress() {
      return this.message.value.user || '-';
    },
    verifierAddress() {
      return this.message.value.verifier || '-';
    },
  },
};
</script>
