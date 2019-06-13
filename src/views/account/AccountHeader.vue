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
          <div class="row p-1 d-flex align-items-center">
            <div class="col-3">
              <span class="p-0">
                <DoughnutChart
                  :chartdata="chartdata"
                  :options="options"
                  height="125"
                  width="125"
                />
              </span>
            </div>
            <div class="col-9">
              <div class="row">
                <div class="col-12 col-md-3">
                  <div class="p-1 d-flex flex-column border-left border-info com-border-w10">
                    <div
                      class="com-font-s13-w700"
                      v-text="partition[0].label"
                    />
                    <div class="d-none d-md-block">
                      <div
                        class="com-font-s13-w400"
                        v-text="partition[0].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
                      />
                      <div class="com-font-s13-w400">{{ partition[0].percent }}%</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="p-1 d-flex flex-column border-left border-success com-border-w10">
                    <div
                      class="com-font-s13-w700"
                      v-text="partition[1].label"
                    />
                    <div class="d-none d-md-block">
                      <div
                        class="com-font-s13-w400"
                        v-text="partition[1].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
                      />
                      <div class="com-font-s13-w400">{{ partition[1].percent }}%</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="p-1 d-flex flex-column border-left border-warning com-border-w10">
                    <div
                      class="com-font-s13-w700"
                      v-text="partition[2].label"
                    />
                    <div class="d-none d-md-block">
                      <div
                        class="com-font-s13-w400"
                        v-text="partition[2].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
                      />
                      <div class="com-font-s13-w400">{{ partition[2].percent }}%</div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="p-1 d-flex flex-column border-left border-danger com-border-w10">
                    <div
                      class="com-font-s13-w700"
                      v-text="partition[3].label"
                    />
                    <div class="d-none d-md-block">
                      <div
                        class="com-font-s13-w400"
                        v-text="partition[3].count.toLocaleString(undefined,{ minimumFractionDigits: 6, maximumFractionDigits: 6 })"
                      />
                      <div class="com-font-s13-w400">{{ partition[3].percent }}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "Components/common/DoughnutChart.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/qrcode";

export default {
  name: "AccountHeader",
  description: "Display the account header data",
  components: {
    DoughnutChart,
    Icon
  },
  props: {
    account: {
      type: Object,
      required: true,
      note: "Object representing a account"
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return (
                data["labels"][tooltipItem["index"]] +
                ": " +
                data["datasets"][0]["data"][tooltipItem["index"]] +
                "%"
              );
            }
          }
        }
      }
    };
  },
  computed: {
    isFetching() {
      return false;
    },
    atoms() {
      return this.account.atoms;
    },
    labelTotal() {
      let label = this.$t("labels.total");
      return `${label} ATOMs`;
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
    partition() {
      return this.atoms.partition;
    },
    labels() {
      let labels = [];
      this.partition.forEach(type => {
        labels.push(type.label);
      });
      return labels;
    },
    data() {
      let data = [];
      this.partition.forEach(type => {
        data.push(type.percent);
      });
      return data;
    },
    chartdata() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: ["#3399ff", "#33cc99", "#ffcc00", "#cc3333"]
          }
        ]
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.com-border-w10 {
  border-width: 10px !important;
}
</style>
