<template>
  <v-form :disabled="isHandling">
    <v-row>
      <v-col cols="12">
        <base-form-text-field
          id="send-recipient"
          :label="$t('labels.recipient')"
          v-model.trim="model.recipient"
        />
      </v-col>
      <v-col cols="12">
        <base-form-number-field
          id="send-amount"
          :label="$t('labels.amount')"
          v-model.trim="model.amount"
        />
      </v-col>
      <v-col cols="12" sm="8" offset-sm="2" md="4" offset-md="4">
        <v-btn
          block
          color="primary"
          depressed
          :loading="isHandling"
          @click="transfer"
        >
          <div class="text-caption" v-text="$t('labels.transfer')" />
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsViewDetailTransferForm',
  data() {
    return {
      model: {
        amount: '0.01',
        recipient: '',
      },
    };
  },
  computed: {
    ...mapGetters('assets', ['isHandling', 'detail']),
    ...mapGetters('keplr', ['wallet']),
  },
  methods: {
    ...mapActions('assets', ['transferAsset']),
    async transfer() {
      const amount = tokensHandler
        .convertToBase(this.model.amount, this.detail.token.decimals)
        .toString();
      const msg = JSON.stringify({
        transfer: { recipient: this.model.recipient, amount },
      });
      const res = await this.transferAsset({
        contract: this.detail.id,
        textMsg: msg,
        translator: this.$t,
        context: this,
      });
      if (res) {
        this.$router.replace({
          name: ROUTES.NAME.ACCOUNT_BALANCE,
          params: { id: this.wallet },
        });
      }
    },
  },
};
</script>
