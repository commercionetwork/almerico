<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex align-items-center">
        <div class="col-12 d-flex justify-content-start">
          <h2
            class="com-font-s16-w700"
            v-html="'Delegators'"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th scope="col">Delegator address</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Share</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center com-font-s13-w400"
                  v-for="delegator in delegators.slice().reverse()"
                  :key="delegator.id"
                >
                  <td class="align-middle">
                    <router-link
                      :to="toAccountDetails(delegator.pub_key)"
                      v-text="delegator.pub_key"
                      class="d-inline-block text-truncate com-font-s13-w400"
                      style="max-width: 120px;"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="`${delegator.voting.power.toLocaleString()} ATOM`"
                  />
                  <td
                    class="align-middle"
                    v-text="`${delegator.share}%`"
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ROUTE_NAMES } from "Constants";

//TODO: remove
import { mockValidators } from "Store/validators/__mocks__/validatorsOld";

export default {
  name: "ValidatorDetailsDelegators",
  description: "Display a delegators list",
  computed: {
    isFetching() {
      return false;
    },
    delegators() {
      return mockValidators(5);
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
