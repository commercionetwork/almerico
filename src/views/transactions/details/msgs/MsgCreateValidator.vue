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
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize font-weight-bold"
            v-text="'commission'"
          />
          <v-list-item>
            <MsgItemComponent label="rate" :content="commissionRate" />
          </v-list-item>
          <v-list-item>
            <MsgItemComponent label="max rate" :content="commissionMaxRate" />
          </v-list-item>
          <v-list-item>
            <MsgItemComponent
              label="max change rate"
              :content="commissionMaxChangeRate"
            />
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="min self delegation" :content="minSelfDelegation" />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="delegator address"
          :content="delegatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
            params: { id: delegatorAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgLinkComponent
          label="validator address"
          :content="validatorAddress"
          :to="{
            name: ROUTES.NAMES.VALIDATORS_DETAILS,
            params: { id: validatorAddress }
          }"
        />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="amount" :content="amount" class="text-uppercase" />
      </v-list-item>
      <v-list-item>
        <MsgItemComponent label="public key" :content="pubkey" />
      </v-list-item>
    </div>
  </MsgTxComponent>
</template>

<script>
import MsgItemComponent from "@/components/MsgItemComponent.vue";
import MsgLinkComponent from "@/components/MsgLinkComponent.vue";
import MsgTxComponent from "@/components/MsgTxComponent.vue";
import MsgUrlComponent from "@/components/MsgUrlComponent.vue";

import { ROUTES } from "@/constants";
import { numberIntlFormatter, coinAdapter } from "@/utils";

export default {
  name: "MsgCreateValidator",
  description: "Display a create validator transaction message",
  components: {
    MsgItemComponent,
    MsgLinkComponent,
    MsgTxComponent,
    MsgUrlComponent
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing a create validator message"
    }
  },
  data: () => ({
    ROUTES
  }),
  computed: {
    amount() {
      return coinAdapter.format({
        amount: this.message.value.value.amount,
        denom: this.message.value.value.denom
      });
    },
    commissionMaxChangeRate() {
      return this.message.value.commission &&
        this.message.value.commission.max_change_rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission.max_change_rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        : "-";
    },
    commissionMaxRate() {
      return this.message.value.commission &&
        this.message.value.commission.max_rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission.max_rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        : "-";
    },
    commissionRate() {
      return this.message.value.commission && this.message.value.commission.rate
        ? numberIntlFormatter.toPercent({
            amount: this.message.value.commission.rate,
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
          })
        : "-";
    },
    delegatorAddress() {
      return this.message.value.delegator_address
        ? this.message.value.delegator_address
        : "-";
    },
    descriptionDetails() {
      return this.message.value.description &&
        this.message.value.description.details
        ? this.message.value.description.details
        : "-";
    },
    descriptionIdentity() {
      return this.message.value.description &&
        this.message.value.description.identity
        ? this.message.value.description.identity
        : "-";
    },
    descriptionMoniker() {
      return this.message.value.description &&
        this.message.value.description.moniker
        ? this.message.value.description.moniker
        : "-";
    },
    descriptionSecurityContact() {
      return this.message.value.description &&
        this.message.value.description.security_contact
        ? this.message.value.description.security_contact
        : "-";
    },
    descriptionWebsite() {
      return this.message.value.description &&
        this.message.value.description.website
        ? this.message.value.description.website
        : "-";
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation
        ? this.message.value.min_self_delegation
        : "-";
    },
    pubkey() {
      return this.message.value.pubkey ? this.message.value.pubkey : "-";
    },
    subTitle() {
      return this.message.type ? this.message.type.split("/").shift() : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    },
    validatorAddress() {
      return this.message.value.validator_address
        ? this.message.value.validator_address
        : "-";
    }
  }
};
</script>
