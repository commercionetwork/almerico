<template>
  <div class="p-1 rounded-lg bg-light">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row px-3">
        <div class="col-12">
          <div class="row d-flex align-items-center">
            <div class="col-12 col-md-1">
              <span
                class="p-1 com-pointer"
                @click="addModQrCode"
                data-toggle="modal"
                :data-target="modalId"
              >
                <Icon
                  name="qrcode"
                  scale="2"
                  class="text-primary"
                />
              </span>
            </div>
            <div class="col-12 col-md-5 d-flex flex-column">
              <span
                class="com-font-s14-w700"
                v-text="$t('labels.address')"
              />
              <span
                class="text-break com-font-s14-w400"
                v-text="account.address"
              />
            </div>
            <div class="col-12 col-md-3 d-flex flex-column align-items-md-center">
              <span
                class="com-font-s13-w700"
                v-text="labelTotal"
              />
              <span
                class="text-break com-font-s13-w400"
                v-text="total"
              />
            </div>
            <div class="col-12 col-md-3 d-flex flex-column align-items-md-center">
              <span
                class="com-font-s13-w700"
                v-text="value"
              />
              <span
                class="text-break com-font-s13-w400"
                v-text="totalValue"
              />
            </div>
          </div>
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalQrCode from "Components/modals/ModalQrCode.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/qrcode";

import { MODAL_ID, MODAL_SIZE } from "Constants";
import { mapActions } from "vuex";

export default {
  name: "AccountHeader",
  description: "Display the account header data",
  components: {
    Icon
  },
  props: {
    account: {
      type: Object,
      required: true,
      note: "Object representing a account"
    }
  },
  
  computed: {
    modalId() {
      return `#${MODAL_ID}`;
    },
    isFetching() {
      return false;
    },
    atoms() {
      return this.account.atoms;
    },
    labelTotal() {
      let label = this.$t("labels.total");
      return `${label} COOMs`;
    },
    total() {
      return this.atoms.total.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
    },
    value() {
      let value = this.atoms.value.toLocaleString(undefined, {
        style: "currency",
        currency: "EUR"
      });
      return `${value}/ATOM`;
    },
    totalValue() {
      return (this.atoms.total * this.atoms.value).toLocaleString(undefined, {
        style: "currency",
        currency: "EUR"
      });
    },
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
          title: "QR Code"
        },
        componentProps: {
          code: this.$route.params.id
        }
      });
    }
  }
};
</script>
