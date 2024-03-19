<template>
  <v-row>
    <v-col cols="12" md="4" offset-md="4">
      <v-btn
        block
        depressed
        :disabled="disabled"
        :loading="isHandling"
        @click="transfer"
      >
        <span v-text="label" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { bech32Manager } from '@/utils';
import assetsTransferManager from '../helpers/assetsTransferManager';

export default {
  name: 'AssetsModalTransferExecute',
  props: {
    amount: {
      type: String,
      required: true,
    },
    connection: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isDeposit: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    token: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('assets', ['isHandling', 'channels']),
    ...mapGetters('keplr', ['wallet']),
    channel() {
      const channel = this.channels[0];
      return this.isDeposit
        ? channel['counterparty']
        : { port_id: channel['port_id'], channel_id: channel['channel_id'] };
    },
    receiver() {
      return this.isDeposit
        ? this.wallet
        : bech32Manager.encode(
            bech32Manager.decode(this.wallet),
            this.connection.hrp
          );
    },
    sender() {
      return !this.isDeposit
        ? this.wallet
        : bech32Manager.encode(
            bech32Manager.decode(this.wallet),
            this.connection.hrp
          );
    },
  },
  methods: {
    ...mapActions('assets', ['transferTokens']),
    transfer() {
      const msg = assetsTransferManager.buildTransferMsg({
        amount: this.amount,
        channel: this.channel,
        receiver: this.receiver,
        sender: this.sender,
        token: this.token,
      });
      this.transferTokens({ msg, translator: this.$t, context: this });
    },
  },
};
</script>
