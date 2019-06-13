<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row p-1 d-flex align-items-center">
        <div class="col-12">
          <h2
            class="com-font-s16-w700"
            v-text="'Unbondings'"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center com-font-s12-w700">
                  <th scope="col">Validator</th>
                  <th scope="col">Height</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Final date</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="text-center com-font-s11-w400"
                  v-for="unbonding in unbondings.slice().reverse()"
                  :key="unbonding.id"
                >
                  <td class="align-middle">
                    <router-link
                      :to="toValidatorDetails(unbonding.validator.pub_key)"
                      v-text="unbonding.validator.name"
                    />
                  </td>
                  <td class="align-middle">
                    <router-link
                      :to="toBlockDetails(unbonding.height)"
                      v-text="unbonding.height"
                    />
                  </td>
                  <td
                    class="align-middle"
                    v-text="unbonding.amount"
                  />
                  <td
                    class="align-middle"
                    v-text="unbonding.date.toLocaleString()"
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
  name: "AccountUnbondings",
  description: "Display the account unbondings list",
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
    unbondings() {
      let amount = this.account.atoms.partition[3].count.toLocaleString(
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
          height: 456789,
          date: new Date(2019, 10, 11, 12, 30, 1)
        }
      ];
    }
  },
  methods: {
    toBlockDetails(id) {
      return {
        name: ROUTE_NAMES.BLOCKS_DETAILS,
        params: {
          lang: this.$i18n.locale,
          id: id
        }
      };
    },
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
