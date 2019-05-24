<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.validators')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
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
import SectionHeader from "Components/common/SectionHeader.vue";
import TableValidators from "./TableValidators.vue";

export default {
  name: "Validators",
  description: "Container for validators' section",
  components: {
    CellHeight,
    CellTime,
    CellTokens,
    CellValidators,
    SectionHeader,
    TableValidators
  },
  computed: {
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  }
};
</script>
