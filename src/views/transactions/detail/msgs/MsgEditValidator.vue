<template>
  <TxMsgComponent :subtitle="subtitle" :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="$t('titles.description')"
          />
          <DetailItemComponent
            :label="$t('labels.moniker')"
            :content="descriptionMoniker"
          />
          <DetailItemComponent
            :label="$t('labels.identity')"
            :content="descriptionIdentity"
          />
          <DetailUrlComponent
            :label="$t('labels.website')"
            :content="descriptionWebsite"
            :link="descriptionWebsite"
          />
          <DetailItemComponent
            :label="$t('labels.securityContact')"
            :content="descriptionSecurityContact"
          />
          <DetailItemComponent
            :label="$t('labels.details')"
            :content="descriptionDetails"
          />
        </v-list-item-content>
      </v-list-item>
      <DetailLinkComponent
        :label="$t('labels.address')"
        :content="address"
        :route="{
          name: ROUTES.NAME.VALIDATORS_DETAIL,
          params: { id: address },
        }"
      />
      <DetailItemComponent
        :label="$t('labels.rate')"
        :content="commissionRate"
      />
      <DetailItemComponent
        :label="$t('labels.minSelfDelegation')"
        :content="minSelfDelegation"
      />
    </div>
  </TxMsgComponent>
</template>

<script>
import DetailItemComponent from '@/components/DetailItemComponent.vue';
import DetailLinkComponent from '@/components/DetailLinkComponent.vue';
import DetailUrlComponent from '@/components/DetailUrlComponent.vue';
import TxMsgComponent from '@/components/TxMsgComponent.vue';

import { ROUTES } from '@/constants';
import { regExpBuilder } from '@/utils';

export default {
  name: 'MsgEditValidator',
  description: 'Display an edit validator transaction message',
  components: {
    DetailItemComponent,
    DetailLinkComponent,
    DetailUrlComponent,
    TxMsgComponent,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an edit validator message',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    title() {
      const lastSegment = this.message['@type'].match(
        regExpBuilder.getMessageTypeRegExp(),
      )[0];
      return lastSegment.substring(1);
    },
    subtitle() {
      const firstSegments = this.message['@type'].match(
        regExpBuilder.getMessageSourceRegExp(),
      )[0];
      return firstSegments.substring(1);
    },
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
