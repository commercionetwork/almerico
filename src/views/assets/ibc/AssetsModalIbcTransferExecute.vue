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
import { TRANSFER } from '@/constants';

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
      const timeoutTimestamp = (Date.now() + 10 * 60) * 1000 * 1000;
      const amount = assetsTransferHelper.getAmount(this.amount, this.token);
      const denom = assetsTransferHelper.getDenom(channel, this.token);
      const type = this.isDeposit
        ? TRANSFER.TYPE.DEPOSIT
        : TRANSFER.TYPE.WITHDRAW;
      const memo = `{"forward":{"chain":"${this.chain.name}","type":"${type}"}}`;
      const data = {
        receiver,
        sender,
        sourcePort: channel['port_id'],
        sourceChannel: channel['channel_id'],
        timeoutTimestamp: timeoutTimestamp,
        token: {
          amount,
          denom,
        },
        memo,
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
