<template>
  <MsgTx :title="title">
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
      const amount = this.message.value.value.amount || '0';
      const denom = this.message.value.value.denom || '-';
      return `${amount} ${denom}`;
    },
    commissionMaxChangeRate() {
      return this.message.value.commission &&
        this.message.value.commission.max_change_rate
        ? this.toPercent(this.message.value.commission.max_change_rate)
        : '-';
    },
    commissionMaxRate() {
      return this.message.value.commission &&
        this.message.value.commission.max_rate
        ? this.toPercent(this.message.value.commission.max_rate)
        : '-';
    },
    commissionRate() {
      return this.message.value.commission && this.message.value.commission.rate
        ? this.toPercent(this.message.value.commission.rate)
        : '-';
    },
    delegatorAddress() {
      return this.message.value.delegator_address || '-';
    },
    descriptionDetails() {
      return this.message.value.description.details || '-';
    },
    descriptionIdentity() {
      return this.message.value.description.identity || '-';
    },
    descriptionMoniker() {
      return this.message.value.description.moniker || '-';
    },
    descriptionSecurityContact() {
      return this.message.value.description.security_contact || '-';
    },
    descriptionWebsite() {
      return this.message.value.description.website || '-';
    },
    minSelfDelegation() {
      return this.message.value.min_self_delegation || '-';
    },
    pubkey() {
      return this.message.value.pubkey || '-';
    },
    title() {
      return this.message.type ? this.message.type.split('/').pop() : '-';
    },
    validatorAddress() {
      return this.message.value.validator_address || '-';
    },
  },
  methods: {
    toPercent(x) {
      return new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(x);
    },
  },
};
</script>
