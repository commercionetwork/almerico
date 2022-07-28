import { ROUTES } from '@/constants';
import { loadView } from '../index';

const AccountRouter = loadView('account/AccountRouter');
const AccountViewBalance = loadView('account/AccountViewBalance');
const AccountViewDashboard = loadView('account/AccountViewDashboard');

export const accountRoutes = {
  path: ROUTES.PATH.ACCOUNT,
  component: AccountRouter,
  meta: {
    title: ROUTES.TITLE.ACCOUNT,
  },
  children: [
    {
      path: '',
      name: ROUTES.NAME.ACCOUNT,
      component: AccountViewDashboard,
      props: true,
    },
    {
      path: ROUTES.PATH.ACCOUNT_BALANCE,
      name: ROUTES.NAME.ACCOUNT_BALANCE,
      component: AccountViewBalance,
      props: true,
      meta: {
        title: ROUTES.TITLE.ACCOUNT_BALANCE,
      },
    },
    {
      path: ROUTES.PATH.ACCOUNT_DASHBOARD,
      name: ROUTES.NAME.ACCOUNT_DASHBOARD,
      component: AccountViewDashboard,
      props: true,
      meta: {
        title: ROUTES.TITLE.ACCOUNT_DASHBOARD,
      },
    },
  ],
};
