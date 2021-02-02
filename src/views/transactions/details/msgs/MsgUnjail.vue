<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_DETAILS,
                params: { id: address },
              }"
              v-text="address"
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
  name: 'MsgUnjail',
  description: 'Display an unjail transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an unjail message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    address() {
      return this.message.value.address ? this.message.value.address : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
