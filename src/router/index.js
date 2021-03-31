import Vue from 'vue';
import VueRouter from 'vue-router';
import { ROUTES } from '@/constants';

Vue.use(VueRouter);

function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
const Blocks = loadView('blocks/BlocksContainer');
const BlocksDashboard = loadView('blocks/dashboard/index');
const BlocksDetails = loadView('blocks/details/index');
const Dashboard = loadView('dashboard/index');
const Transactions = loadView('transactions/TransactionsContainer');
const TransactionsDashboard = loadView('transactions/dashboard/index');
const TransactionsDetails = loadView('transactions/details/index');
const Validators = loadView('validators/ValidatorsContainer');
const ValidatorsAccount = loadView('validators/account/index');
const ValidatorsDashboard = loadView('validators/dashboard/index');
const ValidatorsDetails = loadView('validators/details/index');
const NotFound = loadView('errors/NotFound');
const ServiceUnavailable = loadView('errors/ServiceUnavailable');

const routes = [
  {
    path: ROUTES.PATHS.ROOT,
    redirect: {
      name: ROUTES.NAMES.DASHBOARD,
    },
  },
  // Blocks
  {
    path: ROUTES.PATHS.BLOCKS,
    component: Blocks,
    meta: {
      title: ROUTES.TITLES.BLOCKS,
    },
    children: [
      {
        path: '',
        name: ROUTES.NAMES.BLOCKS,
        component: BlocksDashboard,
      },
      {
        path: ROUTES.PATHS.BLOCKS_DASHBOARD,
        name: ROUTES.NAMES.BLOCKS_DASHBOARD,
        component: BlocksDashboard,
        meta: {
          title: ROUTES.TITLES.BLOCKS_DASHBOARD,
        },
      },
      {
        path: ROUTES.PATHS.BLOCKS_DETAILS,
        name: ROUTES.NAMES.BLOCKS_DETAILS,
        component: BlocksDetails,
        meta: {
          title: ROUTES.TITLES.BLOCKS_DETAILS,
        },
      },
    ],
  },
  // Dashboard
  {
    path: ROUTES.PATHS.DASHBOARD,
    name: ROUTES.NAMES.DASHBOARD,
    component: Dashboard,
    meta: {
      egnition: true,
      title: ROUTES.TITLES.DASHBOARD,
    },
  },
  // Transactions
  {
    path: ROUTES.PATHS.TRANSACTIONS,
    component: Transactions,
    meta: {
      title: ROUTES.TITLES.TRANSACTIONS,
    },
    children: [
      {
        path: '',
        name: ROUTES.NAMES.TRANSACTIONS,
        component: TransactionsDashboard,
      },
      {
        path: ROUTES.PATHS.TRANSACTIONS_DASHBOARD,
        name: ROUTES.NAMES.TRANSACTIONS_DASHBOARD,
        component: TransactionsDashboard,
        meta: {
          title: ROUTES.TITLES.TRANSACTIONS_DASHBOARD,
        },
      },
      {
        path: ROUTES.PATHS.TRANSACTIONS_DETAILS,
        name: ROUTES.NAMES.TRANSACTIONS_DETAILS,
        component: TransactionsDetails,
        meta: {
          title: ROUTES.TITLES.TRANSACTIONS_DETAILS,
        },
      },
    ],
  },
  // Validators
  {
    path: ROUTES.PATHS.VALIDATORS,
    component: Validators,
    meta: {
      title: ROUTES.TITLES.VALIDATORS,
    },
    children: [
      {
        path: '',
        name: ROUTES.NAMES.VALIDATORS,
        component: ValidatorsDashboard,
      },
      {
        path: ROUTES.PATHS.VALIDATORS_ACCOUNT,
        name: ROUTES.NAMES.VALIDATORS_ACCOUNT,
        component: ValidatorsAccount,
        meta: {
          title: ROUTES.TITLES.VALIDATORS_ACCOUNT,
        },
      },
      {
        path: ROUTES.PATHS.VALIDATORS_DASHBOARD,
        name: ROUTES.NAMES.VALIDATORS_DASHBOARD,
        component: ValidatorsDashboard,
        meta: {
          title: ROUTES.TITLES.VALIDATORS_DASHBOARD,
        },
      },
      {
        path: ROUTES.PATHS.VALIDATORS_DETAILS,
        name: ROUTES.NAMES.VALIDATORS_DETAILS,
        component: ValidatorsDetails,
        meta: {
          title: ROUTES.TITLES.VALIDATORS_DETAILS,
        },
      },
    ],
  },
  // not found
  {
    path: ROUTES.PATHS.NOT_FOUND,
    name: ROUTES.NAMES.NOT_FOUND,
    component: NotFound,
    meta: {
      title: ROUTES.TITLES.NOT_FOUND,
    },
  },
  {
    path: '*',
    redirect: ROUTES.PATHS.NOT_FOUND,
  },
  // service unavailable
  {
    path: ROUTES.PATHS.SERVER_UNREACHABLE,
    name: ROUTES.NAMES.SERVER_UNREACHABLE,
    component: ServiceUnavailable,
    meta: {
      title: ROUTES.TITLES.SERVER_UNREACHABLE,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
