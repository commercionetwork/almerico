<template>
  <div class="row p-3 d-flex align-items-center">
    <div class="col-12 col-md-1 d-flex justify-content-md-center">
      <span
        class="p-1 com-pointer"
        @click="addModQrCode"
        data-toggle="modal"
        :data-target="modalId"
      >
        <Icon
          name="qrcode"
          scale="2"
        />
      </span>
    </div>
    <div class="col-12 col-md-11 d-flex flex-column align-items-start">
      <span
        class="com-font-s14-w700"
        v-text="$t('labels.address')"
      />
      <span
        class="text-break com-font-s14-w400"
        v-text="address"
      />
    </div>
  </div>
</template>

<script>
import ModalQrCode from "Components/modals/ModalQrCode.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/qrcode";

import { MODAL_ID, MODAL_SIZE } from "Constants";
import { mapActions } from "vuex";

export default {
  name: "AccountHeader",
  description: "Display the account header data",
  components: {
    Icon
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account address"
    }
  },
  computed: {
    modalId() {
      return `#${MODAL_ID}`;
    }
  },
  methods: {
    ...mapActions("modals", {
      addModal: "addModal"
    }),
    addModQrCode() {
      this.addModal({
        component: ModalQrCode,
        dialogProps: {
          size: MODAL_SIZE.SMALL,
          title: this.$t("titles.qrCode")
        },
        componentProps: {
          code: this.address
        }
      });
    }
  }
};
</script>
