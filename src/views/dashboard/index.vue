<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="com-font-s20-w800"
          v-html="$t('titles.dashboard')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <input
          class="form-control bg-light rounded-pill com-font-s14-w400"
          :placeholder="$t('messages.search')"
        />
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div class="row">
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellPrice/>
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellHeight/>
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellBonded/>
        </div>
        <div class="col-12 col-md-3 my-1 my-md-0">
          <CellInflation/>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6"></div>
        <div class="col-12 col-md-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CellBonded from "./CellBonded.vue";
import CellHeight from "./CellHeight.vue";
import CellInflation from "./CellInflation.vue";
import CellPrice from "./CellPrice.vue";

export default {
  name: "Dashboard",
  description: "Container for dashboard's section",
  components: {
    CellBonded,
    CellHeight,
    CellInflation,
    CellPrice
  }
};
</script>
