/**
 * Routes, remove magical strings
 */
export const ROUTES = {
  ROOT: "/",
  NOT_FOUND: "/404",
  SERVER_UNREACHABLE: "/:lang/server_unreachable",
  // sections
  ACCOUNT_DETAILS: "/:lang/account/:id",
  BLOCKS: "/:lang/blocks",
  BLOCK_DETAILS: "/:lang/block/:id",
  DASHBOARD: "/:lang/dashboard",
  TRANSACTIONS: "/:lang/transactions",
  TRANSACTION_DETAILS: "/:lang/transaction/:id",
  VALIDATORS: "/:lang/validators",
  VALIDATOR_DETAILS: "/:lang/validator/:id",
  VOTINGS: "/:lang/votings",
  VOTING_DETAILS: "/:lang/voting/:id"
};

/**
 * Names of the routes
 */
export const ROUTE_NAMES = {
  NOT_FOUND: "notFound",
  SERVER_UNREACHABLE: "serverUnreachable",
  ACCOUNT_DETAILS: "accountDetails",
  BLOCKS: "blocks",
  BLOCK_DETAILS: "blockDetails",
  DASHBOARD: "dashboard",
  TRANSACTIONS: "transactions",
  TRANSACTION_DETAILS: "transactionDetails",
  VALIDATORS: "validators",
  VALIDATOR_DETAILS: "validatorDetails",
  VOTINGS: "votings",
  VOTING_DETAILS: "votingDetails"
};

/**
 * Titles of the routes
 */
export const ROUTE_TITLES = {
  NOT_FOUND: "Not found",
  SERVER_UNREACHABLE: "Server unreachable",
  ACCOUNT_DETAILS: "Account details",
  BLOCKS: "Blocks",
  BLOCK_DETAILS: "Block details",
  DASHBOARD: "Dashboard",
  TRANSACTIONS: "Transactions",
  TRANSACTION_DETAILS: "Transaction details",
  VALIDATORS: "Validators",
  VALIDATOR_DETAILS: "Validator details",
  VOTINGS: "Votings",
  VOTING_DETAILS: "Voting details"
};
