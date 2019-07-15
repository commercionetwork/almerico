<template>
  <div class="p-1">
    <div class="row p-1 d-flex align-items-center">
      <div class="col-12">
        <h2
          class="com-font-s16-w700"
          v-text="$t('titles.unbondings')"
        />
      </div>
    </div>
    <div class="row py-1">
      <div class="col-12">
        <div
          v-if="delegations.length > 0"
          class="table-responsive"
        >
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th
                  scope="col"
                  v-text="$t('labels.validator')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.height')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.amount')"
                />
                <th
                  scope="col"
                  v-text="$t('labels.finalDate')"
                />
              </tr>
            </thead>
            <tbody>
              <AccountUnbondingsRow
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
import AccountUnbondingsRow from "./AccountUnbondingsRow.vue";

export default {
  name: "AccountUnbondings",
  description: "Display the account unbondings list",
  components: {
    AccountUnbondingsRow
  },
  props: {
    delegations: {
      type: Array,
      required: true,
      note: "Unbonding delegations list"
    }
  },
  computed: {
    lastDelegations() {
      const delegs = [];
      this.delegations.forEach(delegation => {
        delegation.entries.forEach(entry => {
          delegs.push({
            validator_address: delegation.validator_address,
            entry: entry
          });
        });
      });
      return delegs
        .sort(function(a, b) {
          return b.entry.creation_height - a.entry.creation_height;
        })
        .slice(delegs.length - 10, delegs.length);
    }
  }
};
</script>
