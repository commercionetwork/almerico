<template>
  <div
    v-if="hasModal"
    class="modal fade"
    :id="MODAL_ID"
    tabindex="-1"
    role="dialog"
    data-test="modal"
  >
    <div
      class="modal-dialog modal-dialog-centered"
      :class="propSize"
      role="document"
    >
      <div class="modal-content">
        <div
          v-if="!propNoHeader"
          class="modal-header text-center"
          data-test="header"
        >
          <h1
            class="modal-title w-100 text-center com-font-s20-w800"
            v-html="propTitle"
          />
          <button
            v-if="!propNoControlBox"
            type="button"
            class="close"
            aria-label="Close"
            data-dismiss="modal"
            data-test="control-box"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <Component
          v-if="modal.component"
          v-bind:is="modal.component"
          v-bind="modal.componentProps"
          data-test="component"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { MODAL_ID, MODAL_SIZE } from "Constants";

import JQuery from "jquery";
const $ = JQuery;

export default {
  name: "ModalContainer",
  description: "Contains the components for composing the modal",
  data() {
    return {
      MODAL_ID
    };
  },
  computed: {
    ...mapGetters("modals", {
      hasModal: "hasModal",
      modal: "lastModal"
    }),
    // dialogProps: noControlBox, noHeader, size, title
    propNoControlBox() {
      return this.modal.dialogProps.noControlBox
        ? this.modal.dialogProps.noControlBox
        : false;
    },
    propNoHeader() {
      return this.modal.dialogProps.noHeader
        ? this.modal.dialogProps.noHeader
        : false;
    },
    propSize() {
      const size =
        this.modal && this.modal.dialogProps.size
          ? this.modal.dialogProps.size
          : "";
      return {
        "com-modal-big": size === "" || size === MODAL_SIZE.BIG,
        "com-modal-small": size === MODAL_SIZE.SMALL
      };
    },
    propTitle() {
      return this.modal.dialogProps.title ? this.modal.dialogProps.title : "";
    }
  },
  methods: {
    ...mapActions("modals", {
      removeAllModals: "removeAllModals"
    }),
    onCloseRemoveAllModals() {
      const self = this;
      $(`#${MODAL_ID}`).on("hidden.bs.modal", function() {
        self.removeAllModals();
      });
    }
  },
  updated() {
    this.onCloseRemoveAllModals();
  }
};
</script>
