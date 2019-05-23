<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.validators')"
        />
      </div>
      <div class="col-12 col-md-8">
        <div class="row mx-auto p-1 w-100 rounded bg-white">
          <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
            <span class="com-font-s13-w700">Price:</span>
            <span class="pl-1 com-font-s13-w400">10,00 €</span>
          </div>
          <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
            <span class="com-font-s13-w700">Height:</span>
            <span class="pl-1 com-font-s13-w400">350,12</span>
          </div>
          <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
            <span class="com-font-s13-w700">Bonded:</span>
            <span class="pl-1 com-font-s13-w400">120.012.345</span>
          </div>
          <div class="col-12 col-md-3 d-flex justify-content-between justify-content-md-center">
            <span class="com-font-s13-w700">Inflation:</span>
            <span class="pl-1 com-font-s13-w400">3,5%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellHeight />
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellValidators />
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellTokens />
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellTime />
        </div>
      </div>
      <hr>
      <TableValidators />
    </div>
  </div>
</template>

<script>
import CellHeight from "./CellHeight.vue";
import CellTime from "./CellTime.vue";
import CellTokens from "./CellTokens.vue";
import CellValidators from "./CellValidators.vue";
import TableValidators from "./TableValidators.vue";

export default {
  name: "Validators",
  description: "Container for validators' section",
  components: {
    CellHeight,
    CellTime,
    CellTokens,
    CellValidators,
    TableValidators
  }
};
</script>
