export const TX_TYPES = {
  // cosmos
  CREATE_VALIDATOR: "create_validator",
  DELEGATE: "delegate",
  EDIT_VALIDATOR: "edit_validator",
  REDELEGATE: "begin_redelegate",
  SEND: "send",
  UNBONDING: "begin_unbonding",
  UNJAIL: "unjail",
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
