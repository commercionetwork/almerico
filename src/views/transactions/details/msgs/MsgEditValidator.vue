<template>
  <MsgTxComponent :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'description'"
          />
          <v-list-item>
            <MsgItemComponent label="moniker" :content="descriptionMoniker" />
          </v-list-item>
          <v-list-item>
            <MsgItemComponent label="identity" :content="descriptionIdentity" />
          </v-list-item>
          <v-list-item>
            <MsgUrlComponent label="website" :content="descriptionWebsite" />
          </v-list-item>
          <v-list-item>
            <MsgItemComponent
              label="security contact"
              :content="descriptionSecurityContact"
            />
          </v-list-item>
          <v-list-item>
            <MsgItemComponent label="details" :content="descriptionDetails" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="address"
          :content="address"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: address },
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="commission rate" :content="commissionRate" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="min self delegation" :content="minSelfDelegation" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from '@/components/MsgItemComponent.vue';
import MsgLinkComponent from '@/components/MsgLinkComponent.vue';
import MsgTxComponent from '@/components/MsgTxComponent.vue';
import MsgUrlComponent from '@/components/MsgUrlComponent.vue';

import { ROUTES } from '@/constants';
import { numberIntlFormatter } from '@/utils';

export default {
  name: 'MsgEditValidator',
  description: 'Display an edit validator transaction message',
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
    MsgUrlComponent,
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
    address() {
      return this.message.value.address ? this.message.value.address : '-';
    },
    commissionRate() {
      return this.message.value.commission_rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission_rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        : '-';
    },
    descriptionDetails() {
      return this.message.value.description.details
        ? this.message.value.description.details
        : '-';
    },
    descriptionIdentity() {
      return this.message.value.description.identity
        ? this.message.value.description.identity
        : '-';
    },
    descriptionMoniker() {
      return this.message.value.description.moniker
        ? this.message.value.description.moniker
        : '-';
    },
    descriptionSecurityContact() {
      return this.message.value.description.security_contact
        ? this.message.value.description.security_contact
        : '-';
    },
    descriptionWebsite() {
      return this.message.value.description.website
        ? this.message.value.description.website
        : '-';
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation
        ? this.message.value.min_self_delegation
        : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
  },
};
</script>
