<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <MsgLink
          label="address"
          :content="address"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: address },
          }"
        />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgLink from '@/components/MsgLink.vue';
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgUnjail',
  description: 'Display an unjail transaction message',
  components: {
    MsgLink,
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
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
