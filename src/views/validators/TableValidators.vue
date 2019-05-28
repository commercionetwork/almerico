<template>
  <div class="p-1 h-100 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex justify-content-between">
        <div class="col-12 col-md-8 offset-md-4">
          <SearchValidator />
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Rank</th>
              <th scope="col">Validator</th>
              <th scope="col">Voting power</th>
              <th scope="col">% cunulative share</th>
              <th scope="col">Self-Delegated</th>
              <th scope="col">Delegators(24h)</th>
              <th scope="col">Commission</th>
              <th scope="col">UpTime</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center com-font-s12-w400"
              v-for="validator in validators"
              :key="validator.id"
            >
              <td
                class="align-middle"
                v-text="validator.rank"
              />
              <td
                class="align-middle"
                v-text="validator.name"
              />
              <td class="align-middle">
                <div v-text="validator.voting.power.toLocaleString()" />
                <div
                  class="text-black-50"
                  v-text="percentFormat(validator.voting.power_percent)"
                />
              </td>
              <td
                class="align-middle"
                v-text="percentFormat(validator.share)"
              />
              <td class="align-middle">
                <div v-text="validator.voting.delegated.toLocaleString()" />
                <div
                  class="text-black-50"
                  v-text="percentFormat(validator.voting.delegated_percent)"
                />
              </td>
              <td class="align-middle">
                {{ validator.delegators }} (+1)
              </td>
              <td class="align-middle" v-text="percentFormat(validator.commission)" />
              <td class="align-middle" v-text="percentFormat(validator.uptime)" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import SearchValidator from "./SearchValidator.vue";

export default {
  name: "TableValidators",
  description: "Display the validators list",
  components: {
    SearchValidator
  },
  props: {
    validators: {
      type: Array,
      required: true,
      note: "The validators list to diplay"
    }
  },
  computed: {
    isFetching() {
      return false;
    }
  },
  methods: {
    percentFormat(value) {
      let percent = value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      return `${percent}%`;
    }
  }
};
</script>
