<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span class="text-capitalize" v-text="$t('labels.content')" />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.type')"
            :content="content['@type']"
          />
          <base-detail-item
            :label="$t('labels.title')"
            :content="content.title"
          />
          <base-detail-item
            :label="$t('labels.description')"
            :content="content.description"
          />
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="text-capitalize" v-text="$t('labels.changes')" />
                </v-list-item-title>
                <v-list-item
                  v-for="(change, index) in content.changes"
                  :key="index"
                >
                  <v-list dense>
                    <v-list-item v-for="(value, key) in change" :key="key">
                      <base-detail-item
                        :label="key"
                        :content="value"
                        :is-loop="true"
                      />
                    </v-list-item>
                  </v-list>
                </v-list-item>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="(deposit, index) in initialDeposit" :key="index">
        <base-detail-item
          :label="$t('labels.deposit')"
          :content="deposit"
          :is-loop="true"
          look="text-uppercase"
        />
      </v-list-item>
      <base-detail-link
        :label="$t('labels.proposer')"
        :content="proposerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: proposerAddress },
        }"
        look="font-monotype"
      />
    </div>
  </base-transaction-message>
</template>

<script>
import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgSubmitProposal',
  description: 'Display a submit proposal transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing a submit proposal message',
    },
  },
  data() {
    return {
      ROUTES,
    };
  },
  computed: {
    content() {
      return this.message.content;
    },
    initialDeposit() {
      return this.message.initial_deposit.map((amount) =>
        coinAdapter.format({
          amount: amount.amount,
          denom: amount.denom,
        })
      );
    },
    proposerAddress() {
      return this.message.proposer;
    },
  },
};
</script>
