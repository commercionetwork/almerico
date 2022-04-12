<template>
  <BaseTransactionMessage :message="message">
    <div slot="body">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title
            class="text-capitalize"
            v-text="$t('labels.content')"
          />
          <BaseDetailItem
            :label="$t('labels.type')"
            :content="content['@type']"
          />
          <BaseDetailItem
            :label="$t('labels.title')"
            :content="content.title"
          />
          <BaseDetailItem
            :label="$t('labels.description')"
            :content="content.description"
          />
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="text-capitalize"
                  v-text="$t('labels.changes')"
                />
                <v-list-item
                  v-for="(change, index) in content.changes"
                  :key="index"
                >
                  <v-list dense>
                    <v-list-item v-for="(value, key) in change" :key="key">
                      <BaseDetailItem
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
        <BaseDetailItem
          :label="$t('labels.deposit')"
          :content="deposit"
          :is-loop="true"
          look="text-uppercase"
        />
      </v-list-item>
      <BaseDetailLink
        :label="$t('labels.proposer')"
        :content="proposerAddress"
        :route="{
          name: ROUTES.NAME.ACCOUNT,
          params: { id: proposerAddress },
        }"
        look="font-monotype"
      />
    </div>
  </BaseTransactionMessage>
</template>

<script>
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';

import { ROUTES } from '@/constants';
import { coinAdapter } from '@/utils';

export default {
  name: 'MsgSubmitProposal',
  description: 'Display a submit proposal transaction message',
  components: {
    BaseDetailItem,
    BaseDetailLink,
    BaseTransactionMessage,
  },
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
