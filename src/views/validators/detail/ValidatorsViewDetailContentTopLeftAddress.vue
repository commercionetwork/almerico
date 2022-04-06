<template>
  <div>
    <div class="px-1">
      <div>
        <span
          class="text-capitalize font-weight-bold"
          v-text="$t('labels.operator')"
        />
        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="copyToClipboard">
              <v-icon small>
                {{ !copied ? mdiContentCopy : mdiCheckAll }}
              </v-icon>
            </v-btn>
          </template>
          <span v-text="$t('msgs.copy')" />
        </v-tooltip>
      </div>
      <div class="pl-1 font-monotype" v-text="operatorAddress" />
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
  </div>
</template>

<script>
import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';
import { mdiCheckAll, mdiContentCopy } from '@mdi/js';

export default {
  name: 'ValidatorsViewDetailContentTopLeftAddress',
  data: () => ({
    mdiCheckAll,
    mdiContentCopy,
    copied: false,
  }),
  computed: {
    ...mapGetters('validators', ['account', 'detail']),
    operatorAddress() {
      return this.detail ? this.detail.operator_address : '';
    },
    toAccount() {
      return {
        name: ROUTES.NAME.ACCOUNT,
        params: { id: this.account },
      };
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.operatorAddress).then(() => {
        this.copied = true;
        setTimeout(() => (this.copied = false), 1000);
      });
    },
  },
};
</script>
