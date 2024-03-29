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
      <base-detail-link
        :label="$t('labels.address')"
        :content="address"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: address },
        }"
        look="font-monotype"
      />
      <base-detail-item :label="$t('labels.rate')" :content="commissionRate" />
      <base-detail-item
        :label="$t('labels.minSelfDelegation')"
        :content="minSelfDelegation"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';

export default {
  name: 'MsgEditValidator',
  description: 'Display an edit validator transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an edit validator message',
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
    address() {
      return this.message.validator_address || '-';
    },
    commissionRate() {
      return this.message.commission_rate
        ? new Intl.NumberFormat(undefined, {
            style: 'percent',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          }).format(this.message.commission_rate)
        : '-';
    },
    minSelfDelegation() {
      return this.message.min_self_delegation || '-';
    },
  },
};
</script>
