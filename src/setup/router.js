import Vue from "vue";
import Router from "vue-router";
import {
  ROUTES,
  ROUTE_NAMES,
  ROUTE_TITLES,
} from "Constants";
import Setup from "Assets/json/config.json";

Vue.use(Router)

function loadView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
const AccountDetails = loadView("account/index");
const BlockDetails = loadView("blocks/BlockDetails");
const Blocks = loadView("blocks/index");
const Dashboard = loadView("dashboard/index");
const Transactions = loadView("transactions/index");
const TransactionDetails = loadView("transactions/TransactionDetails");
const Validators = loadView("validators/index");
const ValidatorDetails = loadView("validators/ValidatorDetails");
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
      },
      meta: {
        egnition: true
      }
    },
    {
      path: ROUTES.ACCOUNT_DETAILS,
      name: ROUTE_NAMES.ACCOUNT_DETAILS,
      component: AccountDetails,
      meta: {
        egnition: Setup.account_details.enabled,
        title: ROUTE_TITLES.ACCOUNT_DETAILS
      }
    },
    {
      path: ROUTES.BLOCKS,
      name: ROUTE_NAMES.BLOCKS,
      component: Blocks,
      meta: {
        egnition: Setup.blocks.enabled,
        title: ROUTE_TITLES.BLOCKS
      }
    },
    {
      path: ROUTES.BLOCK_DETAILS,
      name: ROUTE_NAMES.BLOCK_DETAILS,
      component: BlockDetails,
      meta: {
        egnition: Setup.block_details.enabled,
        title: ROUTE_TITLES.BLOCK_DETAILS
      }
    },
    {
      path: ROUTES.DASHBOARD,
      name: ROUTE_NAMES.DASHBOARD,
      component: Dashboard,
      meta: {
        egnition: true,
        title: ROUTE_TITLES.DASHBOARD
      }
    },
    {
      path: ROUTES.TRANSACTIONS,
      name: ROUTE_NAMES.TRANSACTIONS,
      component: Transactions,
      meta: {
        egnition: Setup.transactions.enabled,
        title: ROUTE_TITLES.TRANSACTIONS
      }
    },
    {
      path: ROUTES.TRANSACTION_DETAILS,
      name: ROUTE_NAMES.TRANSACTION_DETAILS,
      component: TransactionDetails,
      meta: {
        egnition: Setup.transaction_details.enabled,
        title: ROUTE_TITLES.TRANSACTION_DETAILS
      }
    },
    {
      path: ROUTES.VALIDATORS,
      name: ROUTE_NAMES.VALIDATORS,
      component: Validators,
      meta: {
        egnition: Setup.validators.enabled,
        title: ROUTE_TITLES.VALIDATORS
      }
    },
    {
      path: ROUTES.VALIDATOR_DETAILS,
      name: ROUTE_NAMES.VALIDATOR_DETAILS,
      component: ValidatorDetails,
      meta: {
        egnition: Setup.validator_details.enabled,
        title: ROUTE_TITLES.VALIDATOR_DETAILS
      }
    },
    {
      path: ROUTES.VOTINGS,
      name: ROUTE_NAMES.VOTINGS,
      component: Votings,
      meta: {
        egnition: Setup.votings.enabled,
        title: ROUTE_TITLES.VOTINGS
      }
    },
    {
      path: ROUTES.VOTING_DETAILS,
      name: ROUTE_NAMES.VOTING_DETAILS,
      component: VotingsDetails,
      meta: {
        egnition: Setup.voting_details.enabled,
        title: ROUTE_TITLES.VOTING_DETAILS
      }
    },
    // not found
    {
      path: ROUTES.NOT_FOUND,
      name: ROUTE_NAMES.NOT_FOUND,
      component: NotFound,
      meta: {
        egnition: true,
        title: ROUTE_TITLES.NOT_FOUND
      }
    },
    {
      path: "*",
      redirect: ROUTES.NOT_FOUND
    },
    // server unreachable
    {
      path: ROUTES.SERVER_UNREACHABLE,
      name: ROUTE_NAMES.SERVER_UNREACHABLE,
      component: ServerUnreachable,
      meta: {
        egnition: true,
        title: ROUTE_TITLES.SERVER_UNREACHABLE
      }
    }
  ]
})
