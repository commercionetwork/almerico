/**
 * Application customization
 */
export const CUSTOMIZATION = {
  COIN: "Commercio",
  VALIDATORS: {
    CHECKED_BLOCKS: 100,
  },
  TXS: {
    DASHBOARD_ITEMS: 10,
    ACCOUNT_ITEMS: 10,
    TABLE_ITEMS: 25,
    SUPPORTED_TYPES: [{
        name: "MsgBeginRedelegate",
        text: "cosmos-sdk/MsgBeginRedelegate",
        value: "begin_redelegate",
      },
      {
        name: "MsgBuyMembership",
        text: "commercio/MsgBuyMembership",
        value: "buyMembership",
      },
      {
        name: "MsgChangePowerUpStatus",
        text: "commercio/MsgChangePowerUpStatus",
        value: "changePowerUpStatus",
      },
      {
        name: "MsgCloseCdp",
        text: "commercio/MsgCloseCdp",
        value: "closeCdp",
      },
      {
        name: "MsgCreateValidator",
        text: "cosmos-sdk/MsgCreateValidator",
        value: "create_validator",
      },
      {
        name: "MsgDelegate",
        text: "cosmos-sdk/MsgDelegate",
        value: "delegate",
      },
      {
        name: "MsgDeposit",
        text: "cosmos-sdk/MsgDeposit",
        value: "deposit",
      },
      {
        name: "MsgEditValidator",
        text: "cosmos-sdk/MsgEditValidator",
        value: "edit_validator",
      },
      {
        name: "MsgInviteUser",
        text: "commercio/MsgInviteUser",
        value: "inviteUser",
      },
      {
        name: "MsgMoveDeposit",
        text: "commercio/MsgMoveDeposit",
        value: "moveDeposit",
      },
      {
        name: "MsgOpenCdp",
        text: "commercio/MsgOpenCdp",
        value: "openCdp",
      },
      {
        name: "MsgPowerUpDid",
        text: "commercio/MsgPowerUpDid",
        value: "powerUpDid",
      },
      {
        name: "MsgRequestDidDeposit",
        text: "commercio/MsgRequestDidDeposit",
        value: "requestDidDeposit",
      },
      {
        name: "MsgRequestDidPowerUp",
        text: "commercio/MsgRequestDidPowerUp",
        value: "requestDidPowerUp",
      },
      {
        name: "MsgSend",
        text: "cosmos-sdk/MsgSend",
        value: "send",
      },
      {
        name: "MsgSendDocumentReceipt",
        text: "commercio/MsgSendDocumentReceipt",
        value: "sendDocumentReceipt",
      },
      {
        name: "MsgSetIdentity",
        text: "commercio/MsgSetIdentity",
        value: "setIdentity",
      },
      {
        name: "MsgSetMembership",
        text: "commercio/MsgSetMembership",
        value: "setMembership",
      },
      {
        name: "MsgSetUserVerified",
        text: "commercio/MsgSetUserVerified",
        value: "setUserVerified",
      },
      {
        name: "MsgShareDocument",
        text: "commercio/MsgShareDocument",
        value: "shareDocument",
      },
      {
        name: "MsgSubmitProposal",
        text: "cosmos-sdk/MsgSubmitProposal",
        value: "submit_proposal",
      },
      {
        name: "MsgUndelegate",
        text: "cosmos-sdk/MsgUndelegate",
        value: "begin_unbonding",
      },
      {
        name: "MsgUnjail",
        text: "cosmos-sdk/MsgUnjail",
        value: "unjail",
      },
      {
        name: "MsgVote",
        text: "cosmos-sdk/MsgVote",
        value: "vote",
      },
      {
        name: "MsgWithdrawDelegationReward",
        text: "cosmos-sdk/MsgWithdrawDelegationReward",
        value: "withdraw_delegator_reward",
      }
    ]
  }
};