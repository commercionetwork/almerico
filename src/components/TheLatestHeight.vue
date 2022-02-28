<template>
  <BaseTopContentCard :title="$t('titles.latestHeight')">
    <template #content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-center"
      >
        <router-link
          class="text-h4 text-decoration-none font-weight-bold"
          v-text="blockHeight"
          :to="blockLink"
        />
        <div class="font-weight-bold" v-text="time" />
        <div>
          <span v-text="$t('labels.msgsOnTxs')" />
          <span class="pl-1 font-weight-bold" v-text="msgsOnTxs" />
        </div>
        <div>
          <span v-text="$t('labels.proposer')" />
          <router-link
            class="pl-1 text-decoration-none font-weight-bold"
            v-text="proposerName"
            :to="proposerLink"
          />
        </div>
        <div>
          <span v-text="$t('labels.validators')" />
          <span
            class="pl-1 font-weight-bold"
            v-text="bondedOnTotalValidators"
          />
        </div>
      </div>
    </template>
  </BaseTopContentCard>
</template>

<script>
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';

import { CONFIG, ROUTES, VALIDATORS } from '@/constants';
import { mapGetters } from 'vuex';
import { proposerHandler } from '@/utils';

export default {
  name: 'TheLatestHeight',
  components: { BaseTopContentCard },
  computed: {
    ...mapGetters('application', {
      block: 'latestBlock',
      txs: 'latestTransactions',
      validators: 'validators',
      validatorSets: 'latestValidatorSets',
    }),
    blockLink() {
      return this.blockHeight
        ? {
            name: ROUTES.NAME.BLOCKS_DETAIL,
            params: { id: this.blockHeight },
          }
        : {};
    },
    blockHeight() {
      return this.block.header.height;
    },
    bondedOnTotalValidators() {
      const bonded = this.validators.filter(
        (validator) => validator.status === VALIDATORS.STATUS.BONDED
      ).length;
      return `${this.validators.length} (${this.$t(
        'labels.bonded'
      )} ${bonded})`;
    },
    msgsOnTxs() {
      const msgs = this.txs.reduce(
        (acc, item) => acc + item.body.messages.length,
        0
      );
      return `${msgs}/${this.txs.length}`;
    },
    proposer() {
      return proposerHandler.getFromHexAddress({
        address: this.block.header.proposer_address,
        prefix: CONFIG.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
        validatorSets: this.validatorSets,
        validators: this.validators,
      });
    },
    proposerLink() {
      return {
        name: ROUTES.NAME.VALIDATORS_DETAIL,
        params: {
          id: this.proposer ? this.proposer.operator_address : undefined,
        },
      };
    },
    proposerName() {
      return this.proposer ? this.proposer.description.moniker : '-';
    },
    time() {
      return new Date(this.block.header.time).toLocaleString();
    },
  },
};
</script>
