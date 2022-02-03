import { ROUTES } from '@/constants';
import { loadView } from '../index';

const Validators = loadView('validators/index');
const ValidatorsDetail = loadView('validators/ValidatorsDetail');
const ValidatorsList = loadView('validators/ValidatorsList');

export const validatorsRoutes = {
  path: ROUTES.PATH.VALIDATORS,
  component: Validators,
  meta: {
    title: ROUTES.TITLE.VALIDATORS,
  },
  children: [
    { path: '', name: ROUTES.NAME.VALIDATORS, component: ValidatorsList },
    {
      path: ROUTES.PATH.VALIDATORS_DETAIL,
      name: ROUTES.NAME.VALIDATORS_DETAIL,
      component: ValidatorsDetail,
      meta: {
        title: ROUTES.TITLE.VALIDATORS_DETAIL,
      },
    },
    {
      path: ROUTES.PATH.VALIDATORS_LIST,
      name: ROUTES.NAME.VALIDATORS_LIST,
      component: ValidatorsList,
      meta: {
        title: ROUTES.TITLE.VALIDATORS_LIST,
      },
    },
  ],
};
