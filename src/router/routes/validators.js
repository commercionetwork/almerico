import { ROUTES } from '@/constants';
import { loadView } from '../index';

const ValidatorsRouter = loadView('validators/ValidatorsRouter');
const ValidatorsViewDetail = loadView('validators/ValidatorsViewDetail');
const ValidatorsViewList = loadView('validators/ValidatorsViewList');

export const validatorsRoutes = {
  path: ROUTES.PATH.VALIDATORS,
  component: ValidatorsRouter,
  meta: {
    title: ROUTES.TITLE.VALIDATORS,
  },
  children: [
    { path: '', name: ROUTES.NAME.VALIDATORS, component: ValidatorsViewList },
    {
      path: ROUTES.PATH.VALIDATORS_DETAIL,
      name: ROUTES.NAME.VALIDATORS_DETAIL,
      component: ValidatorsViewDetail,
      meta: {
        title: ROUTES.TITLE.VALIDATORS_DETAIL,
      },
    },
    {
      path: ROUTES.PATH.VALIDATORS_LIST,
      name: ROUTES.NAME.VALIDATORS_LIST,
      component: ValidatorsViewList,
      meta: {
        title: ROUTES.TITLE.VALIDATORS_LIST,
      },
    },
  ],
};
