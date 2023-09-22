import Vue from 'vue';
import App from './App.vue';
import i18n from './locale';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

import BaseChart from '@/components/chart/BaseChart.vue';
import BaseDetailItem from '@/components/BaseDetailItem.vue';
import BaseDetailLink from '@/components/BaseDetailLink.vue';
import BaseDetailUrl from '@/components/BaseDetailUrl.vue';
import BaseFormTextField from '@/components/BaseFormTextField.vue';
import BaseLoadingCircular from '@/components/BaseLoadingCircular.vue';
import BaseLoadingLinear from '@/components/BaseLoadingLinear.vue';
import BaseTopContentCard from '@/components/BaseTopContentCard.vue';
import BaseTransactionMessage from '@/components/BaseTransactionMessage.vue';
import TheAlertNotice from '@/components/TheAlertNotice.vue';
import TheChainChooser from '@/components/TheChainChooser.vue';
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheHeaderContent from '@/components/TheHeaderContent.vue';
import TheLatestHeight from '@/components/TheLatestHeight.vue';
import TheSearchBar from '@/components/TheSearchBar.vue';

Vue.component('base-chart', BaseChart);
Vue.component('base-detail-item', BaseDetailItem);
Vue.component('base-detail-link', BaseDetailLink);
Vue.component('base-detail-url', BaseDetailUrl);
Vue.component('base-form-text-field', BaseFormTextField);
Vue.component('base-loading-circular', BaseLoadingCircular);
Vue.component('base-loading-linear', BaseLoadingLinear);
Vue.component('base-top-content-card', BaseTopContentCard);
Vue.component('base-transaction-message', BaseTransactionMessage);
Vue.component('the-alert-notice', TheAlertNotice);
Vue.component('the-chain-chooser', TheChainChooser);
Vue.component('the-error-message', TheErrorMessage);
Vue.component('the-header-content', TheHeaderContent);
Vue.component('the-latest-height', TheLatestHeight);
Vue.component('the-search-bar', TheSearchBar);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
