<template>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2" md="4" offset-md="4">
      <v-btn
        block
        color="primary"
        depressed
        :loading="isHandling"
        @click="send"
      >
        <div class="text-caption" v-text="$t('labels.send')" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { tokensHandler } from '@/utils';

export default {
  name: 'AccountsModalBtnSend',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('accountBalance', ['cw20', 'isHandling']),
  },
  methods: {
    ...mapActions('accountBalance', ['sendTokens']),
    async send() {
      const amount = tokensHandler
        .convertToBase(this.model.amount, this.cw20.balance.decimals)
        .toString();
      const msg = JSON.stringify({
        transfer: { recipient: this.model.recipient, amount },
      });
      const res = await this.sendTokens({
        contract: this.cw20.balance.contract,
        textMsg: msg,
        translator: this.$t,
        context: this,
        accountAddress: this.cw20.accountAddress,
      });
      if (res) {
        this.$emit('sent');
      }
    },
  },
};
</script>
