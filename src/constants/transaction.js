export const TX_TYPES = {
  // cosmos
  BEGIN_REDELEGATE: "begin_redelegate",
  BEGIN_UNBONDING: "begin_unbonding",
  CREATE_VALIDATOR: "create_validator",
  DELEGATE: "delegate",
  EDIT_VALIDATOR: "edit_validator",
  SEND: "send",
  UNJAIL: "unjail",
  WITHDRAW_DELEGATOR_REWARD: "withdraw_delegator_reward",
  // commercio
  CREATE_ACCOUNT: "create_account",
  CREATE_CONNECTION: "create_connection",
  SET_IDENTITY: "set_identity",
  SHARE_DOCUMENT: "share_document",
  STORE_DOCUMENT: "store_document",
};

export const ACCOUNT_ROLES = {
  DELEGATOR: "delegator",
  RECIPIENT: "recipient",
  SENDER: "sender",
};

export const VALIDATOR_ROLES = {
  DESTINATION_VALIDATOR: "destination-validator",
  SOURCE_VALIDATOR: "source-validator",
  VALIDATOR: "validator"
};
