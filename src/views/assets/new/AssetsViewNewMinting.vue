<template>
  <v-card flat>
    <v-card-subtitle>
      <div class="text-h6" v-text="$t('titles.mintingDetail')" />
      <div v-text="$t('msgs.addingAMinter')" />
    </v-card-subtitle>
    <v-card-text>
      <assets-view-new-cap
        :minter="wallet"
        :v="$v.model.cap"
        v-model="model.cap"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import AssetsViewNewCap from './AssetsViewNewCap.vue';

import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';

export default {
  name: 'AssetsViewNewMinting',
  components: {
    AssetsViewNewCap,
  },
  data() {
    return {
      model: {
        cap: '0.01',
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
};
</script>
