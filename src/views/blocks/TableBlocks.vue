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
              <th scope="col">Height</th>
              <th scope="col">Block Hash</th>
              <th scope="col">Proposer</th>
              <th scope="col">Txs</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">345678</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">1</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">345678</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">1</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">345678</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">1</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">345678</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">1</td>
              <td class="align-middle">1m ago</td>
            </tr>
            <tr class="text-center com-font-s12-w400">
              <td class="align-middle">345678</td>
              <td class="align-middle">DFEE9...6753E</td>
              <td class="align-middle">commerc.io network</td>
              <td class="align-middle">1</td>
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
  name: "TableBlocks",
  description: "Display the blocks list",
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
