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
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'moniker'"
                />
                {{ descriptionMoniker }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'identity'"
                />
                {{ descriptionIdentity }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'website'"
                />
                {{ descriptionWebsite }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'security contact'"
                />
                {{ descriptionSecurityContact }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'details'"
                />
                {{ descriptionDetails }}
              </div>
            </v-list-item-content>
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
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'rate'"
                />
                {{ commissionRate }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'max rate'"
                />
                {{ commissionMaxRate }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <div>
                <span
                  class="pr-3 text-capitalize font-weight-bold"
                  v-text="'max change rate'"
                />
                {{ commissionMaxChangeRate }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'min self delegation'"
            />
            {{ minSelfDelegation }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'delegator address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
                params: { id: delegatorAddress },
              }"
              v-text="delegatorAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'validator address'"
            />
            <router-link
              :to="{
                name: ROUTES.NAMES.VALIDATORS_DETAILS,
                params: { id: validatorAddress },
              }"
              v-text="validatorAddress"
            />
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'amount'"
            />
            {{ amount }}
          </div>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <div>
            <span
              class="pr-3 text-capitalize font-weight-bold"
              v-text="'public key'"
            />
            {{ pubkey }}
          </div>
        </v-list-item-content>
      </v-list-item>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from '@/components/MsgTx.vue';

import { ROUTES } from '@/constants';
import { numberIntlFormatter } from '@/utils';

export default {
  name: 'MsgCreateValidator',
  description: 'Display a create validator transaction message',
  components: {
    MsgTx,
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
