<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.description')"
          />
          <BaseDetailItem
            :label="$t('labels.moniker')"
            :content="descriptionMoniker"
          />
          <BaseDetailItem
            :label="$t('labels.identity')"
            :content="descriptionIdentity"
          />
          <BaseDetailItem
            :label="$t('labels.website')"
            :content="descriptionWebsite"
          />
          <BaseDetailItem
            :label="$t('labels.securityContact')"
            :content="descriptionSecurityContact"
          />
          <BaseDetailItem
            :label="$t('labels.details')"
            :content="descriptionDetails"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.commission')"
          />
          <BaseDetailItem
            :label="$t('labels.rate')"
            :content="commissionRate"
          />
          <BaseDetailItem
            :label="$t('labels.maxRate')"
            :content="commissionMaxRate"
          />
          <BaseDetailItem
            :label="$t('labels.maxChangeRate')"
            :content="commissionMaxChangeRate"
          />
        </v-list-item-content>
      </v-list-item>
      <BaseDetailItem
        :label="$t('labels.minSelfDelegation')"
        :content="minSelfDelegation"
      />
      <BaseDetailLink
        :label="$t('labels.delegatorAddress')"
        :content="delegatorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: delegatorAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailLink
        :label="$t('labels.validatorAddress')"
        :content="validatorAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorAddress },
        }"
        look="font-monotype"
      />
      <BaseDetailItem
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
      <BaseDetailItem :label="$t('labels.publicKey')" :content="pubkey" />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgCreateValidator',
  description: 'Display a create validator transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a create validator message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    descriptionMoniker() {
      return this.message.description.moniker;
    },
    descriptionIdentity() {
      return this.message.description && this.message.description.identity
        ? this.message.description.identity
        : '-';
    },
    descriptionWebsite() {
      return this.message.description && this.message.description.website
        ? this.message.description.website
        : '';
    },
    descriptionSecurityContact() {
      return this.message.description &&
        this.message.description.security_contact
        ? this.message.description.security_contact
        : '-';
    },
    descriptionDetails() {
      return this.message.description && this.message.description.details
        ? this.message.description.details
        : '-';
    },
    commissionRate() {
      return this.message.commission && this.message.commission.rate
        ? new Intl.NumberFormat(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(this.message.commission.rate)
        : '-';
    },
    commissionMaxRate() {
      return this.message.commission && this.message.commission.max_rate
        ? new Intl.NumberFormat(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(this.message.commission.max_rate)
        : '-';
    },
    commissionMaxChangeRate() {
      return this.message.commission && this.message.commission.max_change_rate
        ? new Intl.NumberFormat(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(this.message.commission.max_change_rate)
        : '-';
    },
    minSelfDelegation() {
      return this.message.min_self_delegation
        ? this.message.min_self_delegation
        : '-';
    },
    delegatorAddress() {
      return this.message.delegator_address
        ? this.message.delegator_address
        : '-';
    },
    validatorAddress() {
      return this.message.validator_address
        ? this.message.validator_address
        : '-';
    },
    amount() {
      return coinAdapter.format({
        amount: this.message.value.amount,
        denom: this.message.value.denom,
      });
    },
    pubkey() {
      return this.message.pubkey ? this.message.pubkey : '-';
    },
  },
};
</script>
