import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  ROUTES,
  ROUTE_NAMES,
  ROUTE_TITLES,
} from "Constants";
import Config from "../config/config.json";

Vue.use(VueRouter)

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
const VotingDetails = loadView("votings/VotingDetails");
// error
const NotFound = loadView("NotFound");
const ServerUnreachable = loadView("ServerUnreachable");

const routes = [{
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
      egnition: Config.account_details.enabled,
      title: ROUTE_TITLES.ACCOUNT_DETAILS
    }
  },
  {
    path: ROUTES.BLOCKS,
    name: ROUTE_NAMES.BLOCKS,
    component: Blocks,
    meta: {
      egnition: Config.blocks.enabled,
      title: ROUTE_TITLES.BLOCKS
    }
  },
  {
    path: ROUTES.BLOCK_DETAILS,
    name: ROUTE_NAMES.BLOCK_DETAILS,
    component: BlockDetails,
    meta: {
      egnition: Config.block_details.enabled,
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
      egnition: Config.transactions.enabled,
      title: ROUTE_TITLES.TRANSACTIONS
    }
  },
  {
    path: ROUTES.TRANSACTION_DETAILS,
    name: ROUTE_NAMES.TRANSACTION_DETAILS,
    component: TransactionDetails,
    meta: {
      egnition: Config.transaction_details.enabled,
      title: ROUTE_TITLES.TRANSACTION_DETAILS
    }
  },
  {
    path: ROUTES.VALIDATORS,
    name: ROUTE_NAMES.VALIDATORS,
    component: Validators,
    meta: {
      egnition: Config.validators.enabled,
      title: ROUTE_TITLES.VALIDATORS
    }
  },
  {
    path: ROUTES.VALIDATOR_DETAILS,
    name: ROUTE_NAMES.VALIDATOR_DETAILS,
    component: ValidatorDetails,
    meta: {
      egnition: Config.validator_details.enabled,
      title: ROUTE_TITLES.VALIDATOR_DETAILS
    }
  },
  {
    path: ROUTES.VOTINGS,
    name: ROUTE_NAMES.VOTINGS,
    component: Votings,
    meta: {
      egnition: Config.votings.enabled,
      title: ROUTE_TITLES.VOTINGS
    }
  },
  {
    path: ROUTES.VOTING_DETAILS,
    name: ROUTE_NAMES.VOTING_DETAILS,
    component: VotingDetails,
    meta: {
      egnition: Config.voting_details.enabled,
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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
