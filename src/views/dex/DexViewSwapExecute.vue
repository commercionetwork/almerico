<template>
  <v-card class="mt-3" color="rgba(0,0,0,0)" flat>
    <v-card-actions>
      <v-btn
        block
        color="primary"
        depressed
        :disabled="disabled"
        :loading="isHandling"
        @click="swap"
      >
        <span v-text="$t('labels.swap')" />
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
    ...mapGetters('dex', ['isHandling', 'contract']),
    ...mapGetters('keplr', ['wallet']),
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
