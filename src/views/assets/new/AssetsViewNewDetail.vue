<template>
  <v-card flat>
    <v-card-subtitle>
      <span v-text="$t('titles.contractDetail')" />
    </v-card-subtitle>
    <v-card-text>
      <assets-view-new-name :v="$v.model.name" v-model.trim="model.name" />
      <v-row>
        <v-col cols="12" md="8">
          <assets-view-new-symbol
            :v="$v.model.symbol"
            v-model.trim="model.symbol"
          />
        </v-col>
        <v-col cols="12" md="4">
          <assets-view-new-decimals
            :v="$v.model.decimals"
            v-model.trim="model.decimals"
          />
        </v-col>
      </v-row>
      <assets-view-new-initial-balance
        :v="$v.model.balance"
        v-model.trim="model.balance"
        :wallet="wallet"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import AssetsViewNewDecimals from './AssetsViewNewDecimals.vue';
import AssetsViewNewInitialBalance from './AssetsViewNewInitialBalance.vue';
import AssetsViewNewName from './AssetsViewNewName.vue';
import AssetsViewNewSymbol from './AssetsViewNewSymbol.vue';

import { mapActions, mapGetters } from 'vuex';
import { maxLength, minLength, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { regExpBuilder } from '@/utils';

export default {
  name: 'AssetsViewNewDetail',
  components: {
    AssetsViewNewDecimals,
    AssetsViewNewInitialBalance,
    AssetsViewNewName,
    AssetsViewNewSymbol,
  },
  data() {
    return {
      model: {
        balance: '0.01',
        decimals: '6',
        name: '',
        symbol: '',
      },
    };
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        balance: {
          minValue: (value) => value >= 0,
          required,
        },
        decimals: {
          minValue: (value) => value >= 0,
          required,
        },
        name: {
          maxLength: maxLength(255),
          required,
        },
        symbol: {
          charsAndDash: (value) => {
            const regExp = regExpBuilder.isSymbolValid();
            return regExp.test(value);
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters('keplr', ['wallet']),
  },
};
</script>
