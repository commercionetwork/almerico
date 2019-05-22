<template>
  <div class="p-1 rounded-lg bg-light">
    <div class="row d-flex align-items-start">
      <div class="col-6 d-flex justify-content-start">
        <slot name="top-left-content" />
      </div>
      <div class="col-6 d-flex justify-content-end">
        <slot name="top-right-content" />
      </div>
    </div>
    <div class="row d-flex align-items-end">
      <div class="col-6 d-flex justify-content-start">
        <slot name="bottom-left-content" />
      </div>
      <div class="col-6 d-flex justify-content-end">
        <slot name="bottom-right-content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataCell",
  description: "Display data with 4 slots"
};
</script>
