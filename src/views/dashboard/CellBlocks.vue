<template>
  <TableCell
    :isFetching="isFetching"
    :link="link"
    :title="$t('titles.blocks')"
  >
    <div slot="main-content">
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="text-center com-font-s12-w700">
              <th scope="col">Height</th>
              <th scope="col">Proposer</th>
              <th scope="col">Txs</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387654</td>
              <td class="align-middle">Block1</td>
              <td class="align-middle">0</td>
              <td class="align-middle">2019-05-23 14:23:42<br>(10s ago)</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387655</td>
              <td class="align-middle">Block2</td>
              <td class="align-middle">0</td>
              <td class="align-middle">2019-05-23 14:23:47<br>(15s ago)</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387656</td>
              <td class="align-middle">Block3</td>
              <td class="align-middle">1</td>
              <td class="align-middle">2019-05-23 14:23:52<br>(20s ago)</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">387657</td>
              <td class="align-middle">Block4</td>
              <td class="align-middle">0</td>
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
  name: "CellBlocks",
  description: "Display the blocks table",
  components: {
    TableCell
  },
  computed: {
    isFetching() {
      return false;
    },
    link() {
      return localizedRoute(ROUTE_NAMES.BLOCKS, this.$i18n.locale);
    }
  }
};
</script>
