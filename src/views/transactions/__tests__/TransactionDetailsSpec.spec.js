import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import TransactionDetailsSpec from '../details/TransactionDetailsSpec.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

describe('views/transactions/details/TransactionDetailsSpec.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const props = {
  //   fee: 'prop',
  //   gas: 'prop',
  //   hash: 'prop',
  //   height: 'prop',
  //   ledger: 'prop',
  //   time: 'prop',
  //   version: 'prop',
  //   rawLog: 'prop',
  // };
  // const computed = {
  //   heightLink: () => ({}),
  //   ledgerLink: () => 'link',
  // };

  // test('if raw log is dispalyed', () => {
  //   const wrapper = shallowMount(TransactionDetailsSpec, {
  //     localVue,
  //     propsData: {
  //       ...props,
  //       status: 0,
  //     },
  //     computed,
  //   });

  //   expect(wrapper.find('[data-test="raw-log"]').exists()).toBe(true);
  // });

  // test('if raw log is dispalyed', () => {
  //   const wrapper = shallowMount(TransactionDetailsSpec, {
  //     localVue,
  //     propsData: {
  //       ...props,
  //       status: 1,
  //     },
  //     computed,
  //   });

  //   expect(wrapper.find('[data-test="raw-log"]').exists()).toBe(false);
  // });
});
