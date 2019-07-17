import Vue from "vue";
import Router from "vue-router";
import {
  ROUTES,
  ROUTE_NAMES
} from "Constants";

Vue.use(Router)

function loadView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
const AccountDetails = loadView("account/index");
const BlockDetails = loadView("blocks/BlockDetails");
const Blocks = loadView("blocks/index");
const Dashboard = loadView("dashboard/index");
const Transactions = loadView("transactions/index");
const TransactionsDetails = loadView("transactions/TransactionsDetails");
const Validators = loadView("validators/index");
const ValidatorsDetails = loadView("validators/ValidatorsDetails");
const Votings = loadView("votings/index");
const VotingsDetails = loadView("votings/VotingsDetails");
// error
const NotFound = loadView("NotFound");
const ServerUnreachable = loadView("ServerUnreachable");

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: ROUTES.ROOT,
      redirect: {
        name: ROUTE_NAMES.DASHBOARD
      }
    },
    {
      path: ROUTES.ACCOUNT_DETAILS,
      name: ROUTE_NAMES.ACCOUNT_DETAILS,
      component: AccountDetails,
    },
    {
      path: ROUTES.BLOCKS,
      name: ROUTE_NAMES.BLOCKS,
      component: Blocks,
    },
    {
      path: ROUTES.BLOCK_DETAILS,
      name: ROUTE_NAMES.BLOCK_DETAILS,
      component: BlockDetails,
    },
    {
      path: ROUTES.DASHBOARD,
      name: ROUTE_NAMES.DASHBOARD,
      component: Dashboard,
    },
    {
      path: ROUTES.TRANSACTIONS,
      name: ROUTE_NAMES.TRANSACTIONS,
      component: Transactions,
    },
    {
      path: ROUTES.TRANSACTIONS_DETAILS,
      name: ROUTE_NAMES.TRANSACTIONS_DETAILS,
      component: TransactionsDetails,
    },
    {
      path: ROUTES.VALIDATORS,
      name: ROUTE_NAMES.VALIDATORS,
      component: Validators,
    },
    {
      path: ROUTES.VALIDATORS_DETAILS,
      name: ROUTE_NAMES.VALIDATORS_DETAILS,
      component: ValidatorsDetails,
    },
    {
      path: ROUTES.VOTINGS,
      name: ROUTE_NAMES.VOTINGS,
      component: Votings,
    },
    {
      path: ROUTES.VOTINGS_DETAILS,
      name: ROUTE_NAMES.VOTINGS_DETAILS,
      component: VotingsDetails,
    },
    // not found
    {
      path: ROUTES.NOT_FOUND,
      name: ROUTE_NAMES.NOT_FOUND,
      component: NotFound
    },
    {
      path: "*",
      redirect: ROUTES.NOT_FOUND
    },
    // server unreachable
    {
      path: ROUTES.SERVER_UNREACHABLE,
      name: ROUTE_NAMES.SERVER_UNREACHABLE,
      component: ServerUnreachable
    }
  ]
})
