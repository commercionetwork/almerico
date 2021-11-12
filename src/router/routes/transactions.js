import { ROUTES } from '@/constants';
import { loadView } from '../index';

const Transactions = loadView('transactions/index');
const TransactionsDetail = loadView('transactions/TransactionsDetail');
const TransactionsList = loadView('transactions/TransactionsList');

export const transactionsRoutes = {
  path: ROUTES.PATH.TRANSACTIONS,
  component: Transactions,
  meta: {
    title: ROUTES.TITLE.TRANSACTIONS,
  },
  children: [
    { path: '', name: ROUTES.NAME.TRANSACTIONS, component: TransactionsList },
    {
      path: ROUTES.PATH.TRANSACTIONS_DETAIL,
      name: ROUTES.NAME.TRANSACTIONS_DETAIL,
      component: TransactionsDetail,
      meta: {
        title: ROUTES.TITLE.TRANSACTIONS_DETAIL,
      },
    },
    {
      path: ROUTES.PATH.TRANSACTIONS_LIST,
      name: ROUTES.NAME.TRANSACTIONS_LIST,
      component: TransactionsList,
      meta: {
        title: ROUTES.TITLE.TRANSACTIONS_LIST,
      },
    },
  ],
};
