<template>
  <MsgTx :title="title">
    <div slot="body">
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.proposal')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <span v-text="proposal" />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.voter')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <router-link
            :to="toAccountDetails(address)"
            v-text="address"
          />
        </div>
      </div>
      <div class="row p-1">
        <div
          class="col-12 col-md-3 com-font-s14-w700"
          v-text="$t('labels.vote')"
        />
        <div class="col-12 col-md-9 text-break com-font-s14-w400">
          <span v-text="vote" />
        </div>
      </div>
    </div>
  </MsgTx>
</template>

<script>
import MsgTx from "Components/common/MsgTx.vue";

import { ROUTE_NAMES } from "Constants";

export default {
  name: "MsgVote",
  description: "Display a vote transaction message",
  components: {
    MsgTx
  },
  props: {
    message: {
      type: Object,
      required: true,
      note: "Object representing an unjail message"
    }
  },
  computed: {
    address() {
      return this.message.value.voter ? this.message.value.voter : "-";
    },
    proposal() {
      return this.message.value.proposal_id
        ? this.message.value.proposal_id
        : "-";
    },
    title() {
      return this.message.type ? this.message.type.split("/").pop() : "-";
    },
    vote() {
      return this.message.value.option ? this.message.value.option : "-";
    }
  },
  methods: {
    toAccountDetails(id) {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id
        }
      };
    }
  },
  created() {
    console.log(this.message.value);
  }
};
</script>