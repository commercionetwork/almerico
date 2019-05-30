<template>
  <div class="p-1 rounded-lg bg-light border">
    <div
      v-if="isFetching"
      v-html="$t('messages.loading')"
    />
    <div v-else>
      <div class="row px-3">
        <div class="col-12">
          <div class="row bg-light d-flex align-items-center">
            <div class="col-12 col-md-1">
              <span class="p-1">
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
                class="com-font-s12-w700"
                v-text="labelTotal"
              />
              <span
                class="text-break com-font-s12-w400"
                v-text="atoms"
              />
            </div>
            <div class="col-12 col-md-3 d-flex flex-column align-items-md-center">
              <span
                class="com-font-s12-w700"
                v-text="value"
              />
              <span
                class="text-break com-font-s12-w400"
                v-text="total"
              />
            </div>
          </div>
          <hr>
          <div class="row d-flex align-items-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/qrcode";

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
    isFetching() {
      return false;
    },
    atoms() {
      let atoms = this.account.atoms.total;
      return atoms.toLocaleString(undefined, {
        minimumFractionDigits: 6,
        maximumFractionDigits: 6
      });
    },
    labelTotal() {
      let label = this.$t("labels.total");
      return `${label} ATOMs`;
    },
    value() {
      let value = this.account.atoms.value.toLocaleString(undefined, {
        style: "currency",
        currency: "EUR"
      });
      return `${value}/ATOM`;
    },
    total() {
      return (this.account.atoms.total * this.account.atoms.value).toLocaleString(undefined, {
        style: "currency",
        currency: "EUR"
      });
    }
  }
};
</script>
