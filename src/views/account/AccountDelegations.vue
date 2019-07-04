<template>
  <div class="p-1">
    <div class="row p-1 d-flex align-items-center">
      <div class="col-12">
        <h2
          class="com-font-s16-w700"
          v-text="'Delegations'"
        />
      </div>
    </div>
    <div class="row p-1">
      <div class="col-12">
        <div
          v-if="delegations.length > 0"
          class="table-responsive"
        >
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th scope="col">Validator</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <AccountDelegationsRow
                v-for="(delegation, index) in lastDelegations"
                :key="index"
                :delegation="delegation"
              />
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="text-center com-font-s13-w700"
          v-text="$t('messages.noItems')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AccountDelegationsRow from "./AccountDelegationsRow.vue";

export default {
  name: "AccountDelegations",
  description: "Display the account delegations list",
  components: {
    AccountDelegationsRow
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "Delegations list"
    }
  },
  computed: {
    lastDelegations() {
      return this.delegations.slice(
        this.delegations.length - 10,
        this.delegations.length
      );
    }
  }
};
</script>
