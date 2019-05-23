<template>
  <div class="row">
    <div class="py-1 col-12 col-md-8">
      <input
        type="text"
        class="form-control com-font-s13-w400"
        :placeholder="$t('messages.searchValidator')"
      >
    </div>
    <div class="py-1 col-6 col-md-2">
      <button
        type="button"
        class="btn btn-secondary com-font-s13-w700"
        v-html="$t('buttons.active')"
      />
    </div>
    <div class="py-1 col-6 col-md-2">
      <button
        type="button"
        class="btn btn-outline-secondary com-font-s13-w700"
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
