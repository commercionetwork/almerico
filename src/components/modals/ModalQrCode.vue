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
      <span
        class="mx-auto com-font-s14-w700"
        v-text="$t('messages.scanAddress')"
      />
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
