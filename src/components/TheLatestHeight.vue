<template>
  <base-top-content-card :title="$t('titles.latestHeight')">
    <template #content>
      <div
        class="fill-height d-flex flex-column justify-space-around align-center"
      >
        <router-link
          class="text-h4 text-decoration-none font-weight-bold"
          :to="blockLink"
        >
          <span v-text="blockHeight" />
        </router-link>
        <div class="font-weight-bold" v-text="time" />
        <div>
          <span v-text="$t('labels.msgsOnTxs')" />
          <span class="pl-1 font-weight-bold" v-text="msgsOnTxs" />
        </div>
        <div>
          <span v-text="$t('labels.proposer')" />
          <router-link
            class="pl-1 text-decoration-none font-weight-bold"
            :to="proposerLink"
          >
            <span v-text="proposerName" />
          </router-link>
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
  </base-top-content-card>
</template>

<script>
import { CONFIG, ROUTES, VALIDATORS } from '@/constants';
import { mapGetters } from 'vuex';
import { proposerHandler } from '@/utils';

export default {
  name: 'TheLatestHeight',
  computed: {
    ...mapGetters('application', [
      'latestBlock',
      'latestTransactions',
      'latestValidatorSets',
      'validators',
    ]),
    blockLink() {
      return this.blockHeight
        ? {
            name: ROUTES.NAME.BLOCKS_DETAIL,
            params: { id: this.blockHeight },
          }
        : {};
    },
    blockHeight() {
      return this.latestBlock.header.height;
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
      const msgs = this.latestTransactions.reduce(
        (acc, item) => acc + item.body.messages.length,
        0
      );
      return `${msgs}/${this.latestTransactions.length}`;
    },
    proposer() {
      return proposerHandler.getFromHexAddress({
        address: this.latestBlock.header.proposer_address,
        prefix: CONFIG.PREFIXES.VALIDATOR.CONSENSUS.ADDRESS,
        validatorSets: this.latestValidatorSets,
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
      return new Date(this.latestBlock.header.time).toLocaleString();
    },
  },
};
</script>
