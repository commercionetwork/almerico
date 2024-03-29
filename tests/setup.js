import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import Vuex from 'vuex';

import BaseChart from '../src/components/chart/BaseChart.vue';
import BaseDetailItem from '../src/components/BaseDetailItem.vue';
import BaseDetailLink from '../src/components/BaseDetailLink.vue';
import BaseDetailUrl from '../src/components/BaseDetailUrl.vue';
import BaseFormNumberField from '../src/components/BaseFormNumberField.vue';
import BaseFormTextField from '../src/components/BaseFormTextField.vue';
import BaseLoadingCircular from '../src/components/BaseLoadingCircular.vue';
import BaseLoadingLinear from '../src/components/BaseLoadingLinear.vue';
import BaseSmallWindow from '../src/components/BaseSmallWindow.vue';
import BaseTopContentCard from '../src/components/BaseTopContentCard.vue';
import BaseTransactionMessage from '../src/components/BaseTransactionMessage.vue';
import TheAlertNotice from '../src/components/TheAlertNotice.vue';
import TheChainChooser from '../src/components/TheChainChooser.vue';
import TheErrorMessage from '../src/components/TheErrorMessage.vue';
import TheHeaderContent from '../src/components/TheHeaderContent.vue';
import TheLatestHeight from '../src/components/TheLatestHeight.vue';
import TheSearchBar from '../src/components/TheSearchBar.vue';
import TheTxAssertModal from '../src/components/TheTxAssertModal.vue';

Vue.component('base-chart', BaseChart);
Vue.component('base-detail-item', BaseDetailItem);
Vue.component('base-detail-link', BaseDetailLink);
Vue.component('base-detail-url', BaseDetailUrl);
Vue.component('base-form-number-field', BaseFormNumberField);
Vue.component('base-form-text-field', BaseFormTextField);
Vue.component('base-loading-circular', BaseLoadingCircular);
Vue.component('base-loading-linear', BaseLoadingLinear);
Vue.component('base-small-window', BaseSmallWindow);
Vue.component('base-top-content-card', BaseTopContentCard);
Vue.component('base-transaction-message', BaseTransactionMessage);
Vue.component('the-alert-notice', TheAlertNotice);
Vue.component('the-chain-chooser', TheChainChooser);
Vue.component('the-error-message', TheErrorMessage);
Vue.component('the-header-content', TheHeaderContent);
Vue.component('the-latest-height', TheLatestHeight);
Vue.component('the-search-bar', TheSearchBar);
Vue.component('the-tx-assert-modal', TheTxAssertModal);

Vue.use(VueI18n);
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.config.productionTip = false;
Vue.config.devtools = false;
