<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.description')"
            />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.moniker')"
            :content="descriptionMoniker"
          />
          <base-detail-item
            :label="$t('labels.identity')"
            :content="descriptionIdentity"
          />
          <base-detail-item
            :label="$t('labels.website')"
            :content="descriptionWebsite"
          />
          <base-detail-item
            :label="$t('labels.securityContact')"
            :content="descriptionSecurityContact"
          />
          <base-detail-item
            :label="$t('labels.detail')"
            :content="descriptionDetails"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.commission')"
            />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.rate')"
            :content="commissionRate"
          />
          <base-detail-item
            :label="$t('labels.maxRate')"
            :content="commissionMaxRate"
          />
          <base-detail-item
            :label="$t('labels.maxChangeRate')"
            :content="commissionMaxChangeRate"
          />
        </v-list-item-content>
      </v-list-item>
      <base-detail-item
        :label="$t('labels.minSelfDelegation')"
        :content="minSelfDelegation"
      />
      <base-detail-link
        :label="$t('labels.delegatorAddress')"
        :content="delegatorAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: delegatorAddress },
        }"
        look="font-monotype"
      />
      <base-detail-link
        :label="$t('labels.validatorAddress')"
        :content="validatorAddress"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: validatorAddress },
        }"
        look="font-monotype"
      />
      <base-detail-item
        :label="$t('labels.amount')"
        :content="amount"
        class="text-uppercase"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('labels.publicKey')"
            />
          </v-list-item-title>
          <base-detail-item :label="$t('labels.type')" :content="pubkeyType" />
          <base-detail-item :label="$t('labels.key')" :content="pubkeyKey" />
        </v-list-item-content>
      </v-list-item>
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgCreateValidator',
  description: 'Display a create validator transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a create validator message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
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
    pubkeyType() {
      return this.message.pubkey && this.message.pubkey['@type']
        ? this.message.pubkey['@type']
        : '-';
    },
    pubkeyKey() {
      return this.message.pubkey && this.message.pubkey.key
        ? this.message.pubkey.key
        : '-';
    },
  },
};
</script>
