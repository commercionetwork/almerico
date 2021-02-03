<template>
  <MsgTx :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'recipient address'"
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
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'status'"
          />
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'type'"
                />
                {{ statusType }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'message'"
                />
                {{ statusMessage }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'signer address'"
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
  name: 'MsgChangePowerUpStatus',
  description: 'Display a change powerup status transaction message',
  components: {
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a change powerup status user message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    id() {
      return this.message.value.id ? this.message.value.id : '-';
    },
    recipientAddress() {
      return this.message.value.recipient ? this.message.value.recipient : '-';
    },
    signerAddress() {
      return this.message.value.signer ? this.message.value.signer : '-';
    },
    statusMessage() {
      return this.message.value.status
        ? this.message.value.status.message
        : '-';
    },
    statusType() {
      return this.message.value.status ? this.message.value.status.type : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
