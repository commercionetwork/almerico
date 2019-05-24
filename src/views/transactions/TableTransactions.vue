<template>
  <div class="p-1 h-100 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">TxHash</th>
              <th scope="col">Type</th>
              <th scope="col">Result</th>
              <th scope="col">Fee</th>
              <th scope="col">Height</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Delegate</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">0.000400 ATOM</td>
              <td class="align-middle">345678</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Delegate</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">0.000400 ATOM</td>
              <td class="align-middle">345678</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Delegate</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">0.000400 ATOM</td>
              <td class="align-middle">345678</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Delegate</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">0.000400 ATOM</td>
              <td class="align-middle">345678</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Delegate</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">0.000400 ATOM</td>
              <td class="align-middle">345678</td>
              <td class="align-middle">1m ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableTransactions",
  description: "Display the tansactions list",
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
