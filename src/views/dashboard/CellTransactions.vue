<template>
  <TableCell
    :isFetching="isFetching"
    :link="link"
    :title="$t('titles.transactions')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
              <th scope="col">Tx Hash</th>
              <th scope="col">Result</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387654</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">2019-05-23 14:23:42<br>(10s ago)</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387655</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">2019-05-23 14:23:47<br>(15s ago)</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387656</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">2019-05-23 14:23:52<br>(20s ago)</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387657</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">Success</td>
              <td class="align-middle">2019-05-23 14:23:62<br>(30s ago)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </TableCell>
</template>

<script>
import TableCell from "Components/common/TableCell.vue";

import { ROUTE_NAMES } from "Constants";
import { localizedRoute } from "Utils";

export default {
  name: "CellTransactions",
  description: "Display the Transactions table",
  components: {
    TableCell
  },
  computed: {
    isFetching() {
      return false;
    },
    link() {
      return localizedRoute(ROUTE_NAMES.TRANSACTIONS, this.$i18n.locale);
    }
  }
};
</script>