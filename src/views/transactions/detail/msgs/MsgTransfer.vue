<template>
  <base-transaction-message :message="message">
    <div slot="body">
      <base-detail-item
        :label="$t('labels.sourcePort')"
        :content="message.source_port"
      />
      <base-detail-item
        :label="$t('labels.sourceChannel')"
        :content="message.source_channel"
      />
      <base-detail-item :label="$t('labels.amount')" :content="amount" />
      <base-detail-item
        :label="$t('labels.sender')"
        :content="message.sender"
      />
      <base-detail-item
        :label="$t('labels.receiver')"
        :content="message.receiver"
      />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span
              class="text-capitalize font-weight-bold"
              v-text="$t('titles.timeoutHeight')"
            />
          </v-list-item-title>
          <base-detail-item
            :label="$t('labels.revisionNumber')"
            :content="message.timeout_height.revision_number"
          />
          <base-detail-item
            :label="$t('labels.revisionHeight')"
            :content="message.timeout_height.revision_height"
          />
        </v-list-item-content>
      </v-list-item>
      <base-detail-item
        :label="$t('labels.timeoutTimestamp')"
        :content="timeoutTimestamp"
      />
      <base-detail-item :label="$t('labels.memo')" :content="message.memo" />
    </div>
  </base-transaction-message>
</template>

<script>
import { dateHandler } from '@/utils';

export default {
  name: 'MsgTransfer',
  description: 'Display an an IBC transfer transaction message',
  props: {
    message: {
      type: Object,
      required: true,
      note: 'Object representing an undelegate message',
    },
  },
  computed: {
    amount() {
      return this.message.token.amount + ' ' + this.message.token.denom;
    },
    timeoutTimestamp() {
      if (
        !this.message.timeout_timestamp ||
        this.message.timeout_timestamp === '0'
      ) {
        return '-';
      }
      const timeoutTimestamp =
        parseInt(this.message.timeout_timestamp) / 1000000;
      return dateHandler.getUtcDate(timeoutTimestamp);
    },
  },
};
</script>
