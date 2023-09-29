<template>
  <v-card flat>
    <v-card-subtitle>
      <div class="text-h6" v-text="$t('titles.mintingDetail')" />
      <div v-text="$t('msgs.addingAMinter')" />
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            id="contract-minter"
            dense
            disabled
            outlined
            persistent-placeholder
            :label="$t('labels.address')"
            :placeholder="wallet"
          />
        </v-col>
        <v-col cols="12" md="6">
          <assets-view-new-cap :v="$v.model.cap" v-model="model.cap" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import AssetsViewNewCap from './AssetsViewNewCap.vue';

import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';

export default {
  name: 'AssetsViewNewMinting',
  components: {
    AssetsViewNewCap,
  },
  data() {
    return {
      model: {
        cap: '',
      },
    };
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        cap: {
          minValue: (value) => value >= 0,
        },
      },
    };
  },
  computed: {
    ...mapGetters('keplr', ['wallet']),
  },
  watch: {
    model: {
      handler(value) {
        this.updateContractProp({
          mint: { minter: this.wallet, cap: value.cap },
        });
      },
      deep: true,
    },
  },
  created() {
    this.updateContractProp({
      mint: { minter: this.wallet, cap: this.model.cap },
    });
  },
  methods: {
    ...mapActions('assets', ['updateContractProp']),
  },
};
</script>
