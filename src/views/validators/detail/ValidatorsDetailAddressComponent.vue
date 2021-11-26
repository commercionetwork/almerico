<template>
  <v-card outlined class="d-flex fill-height flex-column">
    <ValidatorsDetailAddressMonikerComponent :detail="detail" />
    <v-divider class="mx-3" />
    <v-card-text>
      <div class="px-1">
        <div>
          <span
            class="text-capitalize font-weight-bold"
            v-text="$t('labels.operator')"
          />
          <v-tooltip top v-model="tooltip">
            <template v-slot:activator="{}">
              <v-btn icon @click="copyToClipboard">
                <v-icon small>mdi-content-copy</v-icon>
              </v-btn>
            </template>
            <span v-text="$t('msgs.copied')" />
          </v-tooltip>
        </div>
        <div class="pl-1 font-monotype" v-text="detail.operator_address" />
      </div>
      <div class="px-1 py-3">
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
  data: () => ({
    tooltip: false,
  }),
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
  methods: {
    copyToClipboard() {
      if (this.tooltip) {
        this.tooltip = false;
        return;
      }
      navigator.clipboard.writeText(this.detail.operator_address).then(() => {
        this.tooltip = true;
        setTimeout(() => {
          if (this.tooltip) this.tooltip = false;
        }, 500);
      });
    },
  },
};
</script>
