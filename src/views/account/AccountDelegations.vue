<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1 d-flex align-items-center">
        <div class="col-12">
          <h2
            class="com-font-s16-w700"
            v-text="'Delegations'"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s13-w700">
                  <th scope="col">Validator</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Reward</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center com-font-s12-w400"
                  v-for="delegation in delegations.slice().reverse()"
                  :key="delegation.id"
                >
                  <td class="align-middle">
                    <router-link
                      :to="toValidatorDetails(delegation.validator.pub_key)"
                      v-text="delegation.validator.name"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="delegation.amount"
                  />
                  <td
                    class="align-middle"
                    v-text="delegation.reward"
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

export default {
  name: "AccountDelegations",
  description: "Display the account delegations list",
  props: {
    account: {
      type: Object,
      required: true,
      note: "Object representing an account"
    }
  },
  computed: {
    isFetching() {
      return false;
    },
    delegations() {
      let amount = this.account.atoms.partition[1].count.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6
        }
      );
      let reward = this.account.atoms.partition[2].count.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 6,
          maximumFractionDigits: 6
        }
      );
      return [
        {
          id: 1,
          validator: {
            name: "commercio.network",
            address: "cosmos1fqzqejwkk898fcslw4z4eeqjzesynvrdvhqz82",
            pub_key: "cosmosvaloper1fqzqejwkk898fcslw4z4eeqjzesynvrdfr5hte"
          },
          amount: `${amount} ATOM`,
          reward: `${reward} ATOM`
        }
      ];
    }
  },
  methods: {
    toValidatorDetails(id) {
      return {
        name: ROUTE_NAMES.VALIDATORS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    }
  }
};
</script>
