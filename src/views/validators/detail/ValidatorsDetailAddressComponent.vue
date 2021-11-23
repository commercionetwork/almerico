<template>
  <v-card outlined>
    <ValidatorsDetailAddressMonikerComponent :detail="detail" />
    <v-divider class="mx-3" />
    <v-card-text>
      <div class="pa-1">
        <div
          class="text-capitalize font-weight-bold"
          v-text="$t('labels.operator')"
        />
        <div class="pl-1 font-monotype" v-text="detail.operator_address" />
      </div>
      <div class="pa-1">
        <div
          class="text-capitalize font-weight-bold"
          v-text="$t('labels.address')"
        />
        <router-link
          class="pl-1 text-decoration-none font-monotype"
          :to="toAccount"
          v-text="account"
        />
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import ValidatorsDetailAddressMonikerComponent from './ValidatorsDetailAddressMonikerComponent.vue';
import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';

export default {
  name: 'ValidatorsDetailAddressComponent',
  components: { ValidatorsDetailAddressMonikerComponent },
  props: ['account'],
  computed: {
    ...mapGetters('validators', {
      detail: 'detail',
    }),
    toAccount() {
      return {
        name: ROUTES.NAME.ACCOUNT,
        params: { id: this.account },
      };
    },
  },
};
</script>
