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
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">1</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">
                <div>1.234.567</div>
                <div class="text-black-50">10%</div>
              </td>
              <td class="align-middle">44%</td>
              <td class="align-middle">
                <div>1.234</div>
                <div class="text-black-50">25%</div>
              </td>
              <td class="align-middle">150(+1)</td>
              <td class="align-middle">10%</td>
              <td class="align-middle">100%</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">1</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">
                <div>1.234.567</div>
                <div class="text-black-50">10%</div>
              </td>
              <td class="align-middle">44%</td>
              <td class="align-middle">
                <div>1.234</div>
                <div class="text-black-50">25%</div>
              </td>
              <td class="align-middle">150(+1)</td>
              <td class="align-middle">10%</td>
              <td class="align-middle">100%</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">1</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">
                <div>1.234.567</div>
                <div class="text-black-50">10%</div>
              </td>
              <td class="align-middle">44%</td>
              <td class="align-middle">
                <div>1.234</div>
                <div class="text-black-50">25%</div>
              </td>
              <td class="align-middle">150(+1)</td>
              <td class="align-middle">10%</td>
              <td class="align-middle">100%</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">1</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">
                <div>1.234.567</div>
                <div class="text-black-50">10%</div>
              </td>
              <td class="align-middle">44%</td>
              <td class="align-middle">
                <div>1.234</div>
                <div class="text-black-50">25%</div>
              </td>
              <td class="align-middle">150(+1)</td>
              <td class="align-middle">10%</td>
              <td class="align-middle">100%</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">1</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">
                <div>1.234.567</div>
                <div class="text-black-50">10%</div>
              </td>
              <td class="align-middle">44%</td>
              <td class="align-middle">
                <div>1.234</div>
                <div class="text-black-50">25%</div>
              </td>
              <td class="align-middle">150(+1)</td>
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
