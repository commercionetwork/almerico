import { ROUTES } from '@/constants';
import { loadView } from '../index';

const AccountView = loadView('account/AccountView');

export const accountRoutes = {
  path: ROUTES.PATH.ACCOUNT,
  name: ROUTES.NAME.ACCOUNT,
  component: AccountView,
  meta: {
    title: ROUTES.TITLE.ACCOUNT,
  },
};
