export const TX_TYPES = {
  BEGIN_UNBONDING: "begin_unbonding",
  CREATE_VALIDATOR: "create_validator",
  EDIT_VALIDATOR: "edit_validator",
  SEND: "send",
  UNJAIL: "unjail",
  // commercio
  CREATE_CONNECTION: "create_connection",
  REGISTER: "register",
  SHARE: "share",
  STORE: "store",
  UPSERT_IDENTITY: "upsert-identity",
};

const MSG_BASE = {
  COSMOS_SDK: "cosmos-sdk"
};

export const MSG_TYPES = {
  CREATE_VALIDATOR: `${MSG_BASE.COSMOS_SDK}/MsgCreateValidator`,
  EDIT_VALIDATOR: `${MSG_BASE.COSMOS_SDK}/MsgEditValidator`,
  SEND: `${MSG_BASE.COSMOS_SDK}/MsgSend`,
  UNDELEGATE: `${MSG_BASE.COSMOS_SDK}/MsgUndelegate`,
  UNJAIL: `${MSG_BASE.COSMOS_SDK}/MsgUnjail`,
};
