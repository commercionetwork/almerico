<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1 d-flex justify-content-start">
        <div class="col-12 col-md-6">
          <div class="row d-flex align-items-center">
            <div class="col-6">
              <span
                class="com-font-s14-w700"
                v-text="voting.hashtag"
              />
            </div>
            <div class="col-6 d-flex justify-content-end">
              <span
                class="px-3 rounded-pill bg-dark text-white com-font-s11-w400"
                v-text="voting.status"
              />
            </div>
          </div>
          <div class="row py-2">
            <div class="col-12 d-flex flex-column">
              <span
                class="com-font-s16-w700"
                v-text="voting.title"
              />
              <div class="d-flex flex-row align-items-center com-font-s13-w400">
                <span>{{ $t('labels.proposer') }}: </span>
                <router-link
                  class="pl-1"
                  :to="toAccountDetails(voting.proposer.address)"
                  v-text="voting.proposer.name"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <span
                class="com-font-s13-w700"
                v-text="$t('labels.votingStart')"
              />
            </div>
            <div class="col-12 col-md-8">
              <span
                class="com-font-s13-w400"
                v-text="voting.dates.start.toLocaleString()"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <span
                class="com-font-s13-w700"
                v-text="$t('labels.votingEnd')"
              />
            </div>
            <div class="col-12 col-md-8">
              <span
                class="com-font-s13-w400"
                v-text="voting.dates.end.toLocaleString()"
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="row">
            <div class="col-12 col-md-4">
              <span
                class="com-font-s13-w700"
                v-text="$t('labels.type')"
              />
            </div>
            <div class="col-12 col-md-8">
              <span
                class="com-font-s13-w400"
                v-text="voting.type"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <span
                class="com-font-s13-w700"
                v-text="$t('labels.submitTime')"
              />
            </div>
            <div class="col-12 col-md-8">
              <span
                class="com-font-s13-w400"
                v-text="voting.dates.submit.toLocaleString()"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <span
                class="com-font-s13-w700"
                v-text="$t('labels.depositEndTime')"
              />
            </div>
            <div class="col-12 col-md-8">
              <span
                class="com-font-s13-w400"
                v-text="voting.dates.deposit_end.toLocaleString()"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-4">
              <span
                class="com-font-s13-w700"
                v-text="$t('labels.description')"
              />
            </div>
            <div class="col-12 col-md-8">
              <span
                class="com-font-s13-w400"
                v-text="voting.description"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

export default {
  name: "VotingDetailsHeader",
  description: "Display the voting header",
  props: {
    voting: {
      type: Object,
      required: true,
      note: "Object representing a voting"
    }
  },
  computed: {
    isFetching() {
      return false;
    }
  },
  methods: {
    toAccountDetails(id) {
      return {
        name: ROUTE_NAMES.ACCOUNT_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
