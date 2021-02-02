<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'government'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: governmentAddress },
              }"
              v-text="governmentAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'subscriber'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: subscriberAddress },
              }"
              v-text="subscriberAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'new membership'"
            />
            {{ newMembership }}
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
  name: 'MsgSetMembership',
  description: 'Display a set membership transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a set membership message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    governmentAddress() {
      return this.message.value.government
        ? this.message.value.government
        : '-';
    },
    newMembership() {
      return this.message.value.new_membership
        ? this.message.value.new_membership
        : '-';
    },
    subscriberAddress() {
      return this.message.value.subscriber
        ? this.message.value.subscriber
        : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
