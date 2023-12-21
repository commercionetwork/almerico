<template>
  <v-card-actions class="mx-5">
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { CONTRACT } from '@/constants';
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
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
      hash: '',
    };
  },
  computed: {
    ...mapGetters('dex', ['isHandling', 'detail']),
    ...mapGetters('keplr', ['wallet']),
  },
  methods: {
    ...mapActions('dex', ['executeContract']),
    onClose() {
      this.dialog = false;
    },
    swap() {
      const msgs = [];
      if (this.model.tokenFrom.type === CONTRACT.TOKEN.TYPE.CW20) {
        msgs.push(
          dexSwapManager.buildIncreaseAllowanceMsg({
            sender: this.wallet,
            contract: this.model.tokenFrom.id,
            data: {
              spender: this.detail.id,
              amount: this.model.amount,
              decimals: this.model.tokenFrom.decimals,
            },
          })
        );
      }
      msgs.push(
        dexSwapManager.buildSwapMsg({
          sender: this.wallet,
          contract: this.detail,
          data: this.model,
        })
      );
      this.executeContract({
        msgs,
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
