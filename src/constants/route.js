/**
 * Routes, remove magical strings
 */
export const ROUTES = {
  ROOT: "/",
  NOT_FOUND: "/404",
  SERVER_UNREACHABLE: "/:lang/server_unreachable",
  // sections
  BLOCKS: "/:lang/blocks",
  BLOCKS_DETAILS: "block/:id",
  DASHBOARD: "/:lang/dashboard",
  TRANSACTIONS: "/:lang/transactions",
  TRANSACTIONS_DETAILS: "transaction/:id",
  VALIDATORS: "/:lang/validators",
  VALIDATORS_DETAILS: "validator/:id",
  VOTINGS: "/:lang/votings",
  VOTINGS_DETAILS: "voting/:id"
};

/**
 * Names of the routes
 */
export const ROUTE_NAMES = {
  NOT_FOUND: "notFound",
  SERVER_UNREACHABLE: "serverUnreachable",
  BLOCKS: "blocks",
  BLOCKS_DETAILS: "blocksDetails",
  DASHBOARD: "dashboard",
  TRANSACTIONS: "transactions",
  TRANSACTIONS_DETAILS: "transactionsDetails",
  VALIDATORS: "validators",
  VALIDATORS_DETAILS: "validatorsDetails",
  VOTINGS: "votings",
  VOTINGS_DETAILS: "votingsDetails"
};
