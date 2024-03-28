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
    ...mapGetters('assetsIbc', ['isHandling']),
    ...mapGetters('keplr', ['wallet']),
  },
  methods: {
    ...mapActions('assetsIbc', ['transferTokens']),
    transfer() {
      const receiver = assetsTransferHelper.getReceiver({
        chain: this.chain,
        isDeposit: this.isDeposit,
        wallet: this.wallet,
      });
      const sender = assetsTransferHelper.getSender({
        chain: this.chain,
        isDeposit: this.isDeposit,
        wallet: this.wallet,
      });
      const source = assetsTransferHelper.getSource(this.chain, this.isDeposit);
      const timeoutTimestamp = assetsTransferHelper.getTimeoutTimestamp();
      const token = assetsTransferHelper.getToken({
        amount: this.amount,
        chain: this.chain,
        isDeposit: this.isDeposit,
        token: this.token,
      });
      const memo = `{"forward":{"chain":"${this.chain.id}","sender":"${sender}","receiver":"${receiver}"}}`;
      const data = {
        receiver,
        sender,
        sourceChannel: source.channelId,
        sourcePort: source.portId,
        timeoutTimestamp: timeoutTimestamp,
        token,
        memo,
      };
      const chainData = assetsTransferHelper.getChainDataToBroadcast(
        this.chain,
        this.isDeposit
      );
      this.transferTokens({
        chain: chainData,
        data,
        translator: this.$t,
        context: this,
      }).then((res) => this.$emit('success', res));
    },
  },
};
</script>
