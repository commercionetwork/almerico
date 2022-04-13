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
            :label="$t('labels.detail')"
            :content="descriptionDetails"
          />
        </v-list-item-content>
      </v-list-item>
      <BaseDetailLink
        :label="$t('labels.address')"
        :content="address"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: address },
        }"
        look="font-monotype"
      />
      <BaseDetailItem :label="$t('labels.rate')" :content="commissionRate" />
      <BaseDetailItem
        :label="$t('labels.minSelfDelegation')"
        :content="minSelfDelegation"
      />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';

export default {
  name: 'MsgEditValidator',
  description: 'Display an edit validator transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
      return this.message.address || '-';
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
    minSelfDelegation() {
      return this.message.min_self_delegation || '-';
    },
  },
};
</script>
