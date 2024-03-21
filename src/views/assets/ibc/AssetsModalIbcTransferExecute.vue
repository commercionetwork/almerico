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
  name: 'AssetsModalIbcTransferExecute',
  props: {
    amount: {
      type: String,
      required: true,
    },
    chain: {
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
    ...mapGetters('assetsIbc', ['isHandling', 'connection']),
    ...mapGetters('keplr', ['wallet']),
    channel() {
      const channel = this.connection.channel;
      return this.isDeposit
        ? channel['counterparty']
        : { port_id: channel['port_id'], channel_id: channel['channel_id'] };
    },
    receiver() {
      return this.isDeposit
        ? this.wallet
        : bech32Manager.encode(
            bech32Manager.decode(this.wallet),
            this.chain.hrp
          );
    },
    sender() {
      return !this.isDeposit
        ? this.wallet
        : bech32Manager.encode(
            bech32Manager.decode(this.wallet),
            this.chain.hrp
          );
    },
  },
  methods: {
    ...mapActions('assetsIbc', ['transferTokens']),
    transfer() {
      const msg = assetsTransferManager.getMsg({
        amount: this.amount,
        chain: this.chain,
        connection: this.connection,
        isDeposit: this.isDeposit,
        token: this.token,
        wallet: this.wallet,
      });
      this.transferTokens({ msg, translator: this.$t, context: this });
    },
  },
};
</script>
