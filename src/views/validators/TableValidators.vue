<template>
  <div class="p-1 h-100 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex justify-content-between">
        <div class="col-12">
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
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">1</td>
              <td class="align-middle"></td>
              <td class="align-middle"></td>
              <td class="align-middle"></td>
              <td class="align-middle"></td>
              <td class="align-middle"></td>
              <td class="align-middle">10%</td>
              <td class="align-middle">100%</td>
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
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
