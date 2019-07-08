<template>
  <div>
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row py-1 d-flex align-items-center">
        <div class="col-12 d-flex justify-content-start">
          <h2
            class="com-font-s16-w700"
            v-html="title"
          />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12">
          <slot name="main-content" />
        </div>
      </div>
      <div class="row py-1">
        <div class="col-12 d-flex justify-content-center">
          <router-link
            class="btn btn-outline-primary com-font-s14-w700"
            v-html="$t('buttons.showMore')"
            :to="link"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableCell",
  description: "Display data with a table",
  props: {
    isFetching: {
      type: Boolean,
      default: false,
      note: "Toogle the loading message"
    },
    link: {
      type: Object,
      required: true,
      note: "Link to section"
    },
    title: {
      type: String,
      required: true,
      note: "Cell title"
    }
  }
};
</script>
