<template>
  <v-row>
    <v-col cols="12" sm="8" md="4" offset-sm="2" offset-md="4">
      <v-btn
        block
        color="primary"
        depressed
        :disabled="disabled"
        :loading="isHandling"
        @click="swap"
      >
        <div class="text-caption" v-text="$t('labels.swap')" />
      </v-btn>
      <the-tx-assert-modal
        :hash="hash"
        :title="$t('titles.swap')"
        v-model="dialog"
        @close="onClose"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { CONTRACT } from '@/constants';
import poolsSwapLiquidityManager from './pools-swap-liquidity-manager';

export default {
  name: 'PoolsViewSwapExecute',
  props: {
    model: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      dialog: false,
      hash: '',
    };
  },
  computed: {
    ...mapGetters('poolsDetail', ['isHandling', 'contract']),
    ...mapGetters('keplr', ['wallet']),
    disabled() {
      return !this.model;
    },
  },
  methods: {
    ...mapActions('poolsDetail', ['executeContract']),
    onClose() {
      this.dialog = false;
      this.$emit('success');
    },
    swap() {
      const msgs = [];
      if (this.model.tokenFrom.type === CONTRACT.TOKEN.TYPE.CW20) {
        msgs.push(
          poolsSwapLiquidityManager.buildIncreaseAllowanceMsg({
            sender: this.wallet,
            contract: this.model.tokenFrom.id,
            data: {
              spender: this.contract.id,
              amount: this.model.amount,
              decimals: this.model.tokenFrom.decimals,
            },
          })
        );
      }
      msgs.push(
        poolsSwapLiquidityManager.buildSwapMsg({
          sender: this.wallet,
          contract: this.contract,
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
        }
      });
    },
  },
};
</script>
