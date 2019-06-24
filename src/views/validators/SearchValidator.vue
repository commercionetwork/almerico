<template>
  <div class="row">
    <div class="py-1 col-12 col-md-6">
      <input
        type="text"
        class="form-control com-font-s14-w400"
        :placeholder="$t('messages.searchValidator')"
      >
    </div>
    <div class="py-1 col-6 col-md-3">
      <button
        type="button"
        class="btn btn-primary btn-block com-font-s14-w700"
        v-html="$t('buttons.active')"
      />
    </div>
    <div class="py-1 col-6 col-md-3">
      <button
        type="button"
        class="btn btn-outline-primary btn-block com-font-s14-w700"
        v-html="$t('buttons.inactive')"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchValidator",
  description: "Display input field to search a validator"
};
</script>
