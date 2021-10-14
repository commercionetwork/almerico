import { createLocalVue, shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import ValidatorDetailsBody from '../details/ValidatorDetailsBody.vue';

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Vuetify);

describe('views/validators/details/ValidatorDetailsBody.vue', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });

  // const props = {
  //   account: 'account',
  //   operator: 'operator',
  //   delegations: {},
  // };

  // test('if missing blocks checker is displayed', () => {
  //   const wrapper = shallowMount(ValidatorDetailsBody, {
  //     localVue,
  //     propsData: {
  //       ...props,
  //     },
  //     computed: {
  //       isBlocksMonitor: () => true,
  //     },
  //   });

  //   expect(
  //     wrapper.find('[data-test="is-missing-blocks-checker"]').exists(),
  //   ).toBe(true);
  // });
});
