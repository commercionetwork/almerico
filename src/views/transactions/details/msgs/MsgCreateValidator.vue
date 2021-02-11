<template>
  <MsgTx :subTitle="subTitle" :title="title">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'description'"
          />
          <v-list-item>
            <MsgItem label="moniker" :content="descriptionMoniker" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="identity" :content="descriptionIdentity" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="website" :content="descriptionWebsite" />
          </v-list-item>
          <v-list-item>
            <MsgItem
              label="security contact"
              :content="descriptionSecurityContact"
            />
          </v-list-item>
          <v-list-item>
            <MsgItem label="details" :content="descriptionDetails" />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'commission'"
          />
          <v-list-item>
            <MsgItem label="rate" :content="commissionRate" />
          </v-list-item>
          <v-list-item>
            <MsgItem label="max rate" :content="commissionMaxRate" />
          </v-list-item>
          <v-list-item>
            <MsgItem
              label="max change rate"
              :content="commissionMaxChangeRate"
            />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgItem label="min self delegation" :content="minSelfDelegation" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="delegator address" :content="delegatorAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="validator address" :content="validatorAddress" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="amount" :content="amount" />
      </v-list-item>
      <v-list-item>
        <MsgItem label="public key" :content="pubkey" />
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgItem from '@/components/MsgItem.vue';
import MsgTx from '@/components/MsgTx.vue';

import { numberIntlFormatter } from '@/utils';

export default {
  name: 'MsgCreateValidator',
  description: 'Display a create validator transaction message',
  components: {
    MsgItem,
    MsgTx,
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a create validator message',
    },
  },
  computed: {
    amount() {
      return `${this.message.value.value.amount} ${this.message.value.value.denom}`;
    },
    commissionMaxChangeRate() {
      return this.message.value.commission &&
        this.message.value.commission.max_change_rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission.max_change_rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        : '-';
    },
    commissionMaxRate() {
      return this.message.value.commission &&
        this.message.value.commission.max_rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission.max_rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        : '-';
    },
    commissionRate() {
      return this.message.value.commission && this.message.value.commission.rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission.rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })
        : '-';
    },
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : '-';
    },
    descriptionDetails() {
      return this.message.value.description &&
        this.message.value.description.details
        ? this.message.value.description.details
        : '-';
    },
    descriptionIdentity() {
      return this.message.value.description &&
        this.message.value.description.identity
        ? this.message.value.description.identity
        : '-';
    },
    descriptionMoniker() {
      return this.message.value.description &&
        this.message.value.description.moniker
        ? this.message.value.description.moniker
        : '-';
    },
    descriptionSecurityContact() {
      return this.message.value.description &&
        this.message.value.description.security_contact
        ? this.message.value.description.security_contact
        : '-';
    },
    descriptionWebsite() {
      return this.message.value.description &&
        this.message.value.description.website
        ? this.message.value.description.website
        : '-';
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation
        ? this.message.value.min_self_delegation
        : '-';
    },
    pubkey() {
      return this.message.value.pubkey ? this.message.value.pubkey : '-';
    },
    subTitle() {
      return this.message.type ? this.message.type.split('/').shift() : '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
        : '-';
    },
  },
};
</script>
