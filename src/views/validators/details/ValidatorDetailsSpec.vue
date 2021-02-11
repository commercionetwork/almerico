<template>
  <v-card elevation="2">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-list dense class="text-break">
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'tokens:'"
                  />
                  <span class="pl-1" v-text="tokens" />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'voting power:'"
                  />
                  <span class="pl-1" v-text="votingPower" />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'commission:'"
                  />
                  <span class="pl-1" v-text="commission" />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'update time:'"
                  />
                  <span class="pl-1" v-text="updateTime" />
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6">
          <v-list dense class="text-break">
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'website:'"
                  />
                  <span class="pl-1" v-text="website" />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'security contact:'"
                  />
                  <span class="pl-1" v-text="securityContact" />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'identity:'"
                  />
                  <span class="pl-1" v-text="identity" />
                </div>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <div>
                  <span
                    class="text-capitalize font-weight-bold"
                    v-text="'udetails:'"
                  />
                  <span class="pl-1" v-text="particulars" />
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { numberIntlFormatter } from '@/utils';

export default {
  name: 'ValidatorDetailsSpec',
  computed: {
    ...mapGetters('starting', {
      params: 'params',
      pool: 'pool',
    }),
    ...mapGetters('validators', {
      details: 'details',
    }),
    bondDenom() {
      return this.params.bond_denom ? this.params.bond_denom : '';
    },
    commission() {
      return this.details.commission.commission_rates.rate
        ? this.formatPercent(this.details.commission.commission_rates.rate)
        : '-';
    },
    identity() {
      return this.details.description.identity || '-';
    },
    particulars() {
      return this.details.description.details || '-';
    },
    securityContact() {
      return this.details.description.security_contact || '-';
    },
    tokens() {
      return this.formatTokens(parseFloat(this.details.tokens));
    },
    updateTime() {
      return (
        new Date(this.details.commission.update_time).toLocaleString() || '-'
      );
    },
    votingPower() {
      const bonded = parseFloat(this.pool.bonded_tokens);
      const tokens = parseFloat(this.details.tokens);
      const percent = !isNaN(bonded) || bonded > 0 ? tokens / bonded : 0;
      return this.formatPercent(percent);
    },
    website() {
      return this.details.description.website || '-';
    },
  },
  methods: {
    formatPercent(value) {
      return numberIntlFormatter.toPercent({
        amount: value,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
    formatTokens(value) {
      const tokens = numberIntlFormatter.toDecimal({
        amount: value,
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
      });
      return `${tokens} ${this.bondDenom}`;
    },
  },
};
</script>
