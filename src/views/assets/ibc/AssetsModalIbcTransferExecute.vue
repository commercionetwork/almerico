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
import assetsTransferHelper from '../helpers/assetsTransferHelper';

export default {
  name: 'AssetsModalIbcTransferExecute',
  props: {
    amount: {
      type: String,
      required: true,
    },
    chain: {
      type: Object,
      default: () => ({}),
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
  },
  methods: {
    ...mapActions('assetsIbc', ['transferTokens']),
    transfer() {
      const receiver = assetsTransferHelper.getReceiver({
        wallet: this.wallet,
        hrp: this.chain.hrp,
        isDeposit: this.isDeposit,
      });
      const sender = assetsTransferHelper.getSender({
        wallet: this.wallet,
        hrp: this.chain.hrp,
        isDeposit: this.isDeposit,
      });
      const channel = assetsTransferHelper.getChannel(
        this.connection,
        this.isDeposit
      );
      const latestHeight = this.connection.client.client_state.latest_height;
      const timeoutTimestamp = Date.now() + 10 * 60 * 1000;
      const amount = assetsTransferHelper.getAmount(this.amount, this.token);
      const denom = assetsTransferHelper.getDenom(channel, this.token);
      const data = {
        receiver,
        sender,
        sourcePort: channel['port_id'],
        sourceChannel: channel['channel_id'],
        timeoutHeight: {
          revisionNumber: latestHeight.revision_number,
          revisionHeight: latestHeight.revision_height,
        },
        timeoutTimestamp,
        token: {
          amount,
          denom,
        },
      };
      this.transferTokens({
        data,
        translator: this.$t,
        context: this,
      });
    },
  },
};
</script>
