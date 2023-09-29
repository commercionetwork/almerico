<template>
  <v-card-actions>
    <v-row>
      <v-col cols="12" sm="8" offset-sm="2" md="4" offset-md="4">
        <v-btn
          block
          color="primary"
          depressed
          :disabled="!isValidCW20"
          :loading="isHandling"
          @click="instantiate"
        >
          <span v-text="$t('labels.instantiateContract')" />
        </v-btn>
      </v-col>
    </v-row>
  </v-card-actions>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ROUTES } from '@/constants';
import assetsCW20Helper from '../helpers/assetsCW20Helper';

export default {
  name: 'AssetsViewNewInstantiate',
  computed: {
    ...mapGetters('assets', ['newCW20', 'isHandling', 'isValidCW20']),
  },
  methods: {
    ...mapActions('assets', ['createNewAsset']),
    instantiate() {
      const contract = assetsCW20Helper.adapt(this.newCW20);
      this.createNewAsset({
        contract,
        translator: this.$t,
        context: this,
      }).then((res) => {
        if (res) {
          this.$router.replace({ name: ROUTES.NAME.ASSETS });
        }
      });
    },
  },
};
</script>
