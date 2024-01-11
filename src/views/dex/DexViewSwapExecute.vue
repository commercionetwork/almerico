<template>
  <v-card class="mt-3" color="rgba(0,0,0,0)" flat>
    <v-card-actions>
      <v-btn
        block
        color="primary"
        depressed
        :disabled="disabled || !hasWallet"
        :loading="isHandling"
        @click="swap"
      >
        <span v-text="label" />
      </v-btn>
      <the-tx-assert-modal
        :hash="hash"
        :title="$t('titles.swap')"
        v-model="dialog"
        @close="onClose"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dexSwapManager from './dex-swap-manager';

export default {
  name: 'DexViewSwapExecute',
  props: {
    model: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['success'],
  data() {
    return {
      dialog: false,
      hash: '',
    };
  },
  computed: {
    ...mapGetters('dex', ['isHandling', 'hasWallet', 'contract', 'token1']),
    ...mapGetters('keplr', ['wallet']),
    label() {
      return this.hasWallet
        ? this.$t('labels.swap')
        : this.$t('msgs.noWalletConnected');
    },
  },
  methods: {
    ...mapActions('dex', ['executeContract']),
    onClose() {
      this.dialog = false;
    },
    swap() {
      const msg = dexSwapManager.buildSwapMsg({
        sender: this.wallet,
        contract: this.contract,
        data: this.model,
        token1: this.token1,
      });
      this.executeContract({
        msgs: [msg],
        translator: this.$t,
        context: this,
      }).then((res) => {
        if (res) {
          this.hash = res?.transactionHash;
          this.dialog = true;
          this.$emit('success');
        }
      });
    },
  },
};
</script>
