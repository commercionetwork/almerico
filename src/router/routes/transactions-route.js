import { ROUTES } from '@/constants';
import { loadView } from '../index';

const TransactionsRouter = loadView('transactions/TransactionsRouter');
const TransactionsViewDetail = loadView('transactions/TransactionsViewDetail');
const TransactionsViewList = loadView('transactions/TransactionsViewList');
const TransactionsViewSharedoc = loadView(
  'transactions/TransactionsViewSharedoc'
);

const transactionsRoute = {
  path: ROUTES.PATH.TRANSACTIONS,
  component: TransactionsRouter,
  meta: {
    title: ROUTES.TITLE.TRANSACTIONS,
  },
  children: [
    {
      path: '',
      name: ROUTES.NAME.TRANSACTIONS,
      component: TransactionsViewList,
    },
    {
      path: ROUTES.PATH.TRANSACTIONS_DETAIL,
      name: ROUTES.NAME.TRANSACTIONS_DETAIL,
      component: TransactionsViewDetail,
      props: true,
      meta: {
        title: ROUTES.TITLE.TRANSACTIONS_DETAIL,
      },
    },
    {
      path: ROUTES.PATH.TRANSACTIONS_LIST,
      name: ROUTES.NAME.TRANSACTIONS_LIST,
      component: TransactionsViewList,
      meta: {
        title: ROUTES.TITLE.TRANSACTIONS_LIST,
      },
    },
    {
      path: ROUTES.PATH.TRANSACTIONS_SHAREDOC,
      name: ROUTES.NAME.TRANSACTIONS_SHAREDOC,
      component: TransactionsViewSharedoc,
      props: true,
      meta: {
        title: ROUTES.TITLE.TRANSACTIONS_SHAREDOC,
      },
    },
  ],
};

export default transactionsRoute;
