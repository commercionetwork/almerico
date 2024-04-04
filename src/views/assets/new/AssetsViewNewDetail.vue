<template>
  <v-card flat>
    <v-card-subtitle>
      <span class="text-h6" v-text="$t('titles.contractDetail')" />
    </v-card-subtitle>
    <v-card-text>
      <assets-view-new-name :v="$v.model.name" v-model.trim="model.name" />
      <v-row>
        <v-col cols="12" md="6">
          <assets-view-new-symbol
            :v="$v.model.symbol"
            v-model.trim="model.symbol"
          />
        </v-col>
        <v-col cols="12" md="6">
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
import { maxLength, required } from 'vuelidate/lib/validators';
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
          amountVsCap: (value) => {
            if (!this.newCW20 || !this.newCW20.mint.cap) {
              return true;
            }
            return parseFloat(value) <= parseFloat(this.newCW20.mint.cap);
          },
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
            const regExp = regExpBuilder.getCW20SymbolRegExp();
            return regExp.test(value);
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters('assetsNew', ['newCW20']),
    ...mapGetters('keplr', ['wallet']),
  },
  watch: {
    model: {
      handler(value) {
        this.updateContractProp({ name: value.name });
        this.updateContractProp({ symbol: value.symbol });
        this.updateContractProp({ decimals: parseInt(value.decimals) });
        this.updateContractProp({
          initial_balances: [{ address: this.wallet, amount: value.balance }],
        });
      },
      deep: true,
    },
    $v: {
      handler(value) {
        this.updateIsInvalid(value.$invalid);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('assetsNew', ['updateIsInvalid', 'updateContractProp']),
  },
};
</script>
