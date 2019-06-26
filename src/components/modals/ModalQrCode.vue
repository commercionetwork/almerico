<template>
  <div>
    <!-- body -->
    <div class="modal-body">
      <div class="text-center">
        <QrcodeVue
          :value="code"
          :size="size"
          level="H"
        />
      </div>
    </div>
    <!-- footer -->
    <div class="modal-footer">
      <div class="mx-auto d-flex flex-column align-items-center">
        <span
          class="com-font-s14-w400"
          v-text="$t('messages.scanAddress')"
        />
        <span
          class="com-font-s12-w700"
          v-text="code"
        />
      </div>
    </div>
  </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  name: "ModalQrCode",
  description: "Display a QR Code",
  components: {
    QrcodeVue
  },
  props: {
    code: {
      type: String,
      required: true,
      note: "Text to make code"
    }
  },
  data() {
    return { size: 200 };
  }
};
</script>
