import { ROUTES } from '@/constants';
import { loadView } from '../index';

const Account = loadView('account/index');

export const accountRoutes = {
  path: ROUTES.PATH.ACCOUNT,
  name: ROUTES.NAME.ACCOUNT,
  component: Account,
  meta: {
    title: ROUTES.TITLE.ACCOUNT,
  },
};
