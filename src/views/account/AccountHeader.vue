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
    <div class="col-12 col-md-10 d-flex flex-column align-items-start">
      <span
        class="com-font-s14-w700"
        v-text="$t('labels.address')"
      />
      <span
        class="text-break com-font-s14-w400"
        v-text="address"
      />
    </div>
    <div class="col-12 col-md-1 d-flex flex-column justify-content-md-end">
      <Icon
        name="address-card"
        scale="2"
        :style="{color: membershipColor}"
      />
    </div>
  </div>
</template>

<script>
import ModalQrCode from "Components/modals/ModalQrCode.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "vue-awesome/icons/address-card";
import "vue-awesome/icons/qrcode";

import {
  MEMBESHIPS_COLORS,
  MEMBESHIPS_LIST,
  MODAL_ID,
  MODAL_SIZE
} from "Constants";
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
    },
    membership: {
      type: String,
      default: MEMBESHIPS_LIST.GREEN,
      note: "The account membership"
    }
  },
  computed: {
    membershipColor() {
      let color = MEMBESHIPS_COLORS.GREEN;
      switch (this.membership) {
        case MEMBESHIPS_LIST.BRONZE:
          color = MEMBESHIPS_COLORS.BRONZE;
          break;
        case MEMBESHIPS_LIST.SILVER:
          color = MEMBESHIPS_COLORS.SILVER;
          break;
        case MEMBESHIPS_LIST.GOLD:
          color = MEMBESHIPS_COLORS.GOLD;
          break;
        case MEMBESHIPS_LIST.BLACK:
          color = MEMBESHIPS_COLORS.BLACK;
          break;
        default:
          break;
      }
      return color;
    },
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
