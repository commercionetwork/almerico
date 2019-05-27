<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="title"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        &nbsp;
      </div>
    </div>
    <div class="py-3 px-5 rounded bg-white">
      <div class="p-1 rounded-lg bg-light">
        <div class="row p-1">
          <div class="col-12">
            <h2 class="com-font-s16-w700">Header</h2>
          </div>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlocksDetails",
  description: "Display the block details",
  props: {
    block: {
      type: Object,
      required: true,
      description: "Object representing a block"
    }
  },
  computed: {
    title() {
      let label = this.$t('titles.detailsForBlock');
      let id = this.block.id;
      return `${label} #${id}`;
    }
  }
};
</script>
