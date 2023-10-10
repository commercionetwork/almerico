<template>
  <v-row>
    <v-col cols="12" sm="8" offset-sm="2" md="4" offset-md="4">
      <v-btn
        block
        color="primary"
        depressed
        :loading="isHandling"
        @click="save"
      >
        <div class="text-caption" v-text="$t('labels.save')" />
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { tokensHandler } from '@/utils';

export default {
  name: 'AssetsModalBtnMinting',
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('assets', ['detail', 'isHandling']),
  },
  methods: {
    ...mapActions('assets', ['handleAsset']),
    async save() {
      const amount = tokensHandler.convertToBase(
        this.model.amount,
        this.detail.token.decimals
      );
      const msg = JSON.stringify({
        mint: { amount: amount.toString(), recipient: this.model.address },
      });
      const res = await this.handleAsset({
        contract: this.detail.id,
        textMsg: msg,
        translator: this.$t,
        context: this,
      });
      if (res) {
        this.$emit('saved');
      }
    },
  },
};
</script>
