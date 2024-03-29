const KEY = Object.freeze({
  ADD_LIQUIDITY: 'add_liquidity',
  DECREASE_ALLOWANCE: 'decrease_allowance',
  INCREASE_ALLOWANCE: 'increase_allowance',
  MINT: 'mint',
  REMOVE_LIQUIDITY: 'remove_liquidity',
  SWAP: 'swap',
  TRANSFER_NFT: 'transfer_nft',
  UPDATE_MARKETING: 'update_marketing',
});

const SUPPORTED_TYPES = Object.freeze([
  {
    name: 'MsgBeginRedelegate',
    text: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
    value: 'begin_redelegate',
  },
  {
    name: 'MsgBurnCCC',
    text: '/commercionetwork.commercionetwork.commerciomint.MsgBurnCCC',
    value: 'burnCCC',
  },
  {
    name: 'MsgBuyMembership',
    text: '/commercionetwork.commercionetwork.commerciokyc.MsgBuyMembership',
    value: 'buyMembership',
  },
  {
    name: 'MsgCreateValidator',
    text: '/cosmos.staking.v1beta1.MsgCreateValidator',
    value: '/cosmos.staking.v1beta1.MsgCreateValidator',
  },
  {
    name: 'MsgDelegate',
    text: '/cosmos.staking.v1beta1.MsgDelegate',
    value: 'delegate',
  },
  {
    name: 'MsgDepositIntoLiquidityPool',
    text: '/commercionetwork.commercionetwork.commerciokyc.MsgDepositIntoLiquidityPool',
    value: 'depositIntoLiquidityPool',
  },
  {
    name: 'MsgEditValidator',
    text: '/cosmos.staking.v1beta1.MsgEditValidator',
    value: 'edit_validator',
  },
  {
    name: 'MsgExecuteContract',
    text: '/cosmwasm.wasm.v1.MsgExecuteContract',
    value: '/cosmwasm.wasm.v1.MsgExecuteContract',
  },
  {
    name: 'MsgInstantiateContract',
    text: '/cosmwasm.wasm.v1.MsgInstantiateContract',
    value: '/cosmwasm.wasm.v1.MsgInstantiateContract',
  },
  {
    name: 'MsgInviteUser',
    text: '/commercionetwork.commercionetwork.commerciokyc.MsgInviteUser',
    value: 'inviteUser',
  },
  {
    name: 'MsgMintCCC',
    text: '/commercionetwork.commercionetwork.commerciomint.MsgMintCCC',
    value: 'mintCCC',
  },
  {
    name: 'MsgSend',
    text: '/cosmos.bank.v1beta1.MsgSend',
    value: 'send',
  },
  {
    name: 'MsgSendDocumentReceipt',
    text: '/commercionetwork.commercionetwork.documents.MsgSendDocumentReceipt',
    value: 'sendDocumentReceipt',
  },
  {
    name: 'MsgSetIdentity',
    text: '/commercionetwork.commercionetwork.did.MsgSetIdentity',
    value: 'MsgSetIdentity',
  },
  {
    name: 'MsgSetMembership',
    text: '/commercionetwork.commercionetwork.commerciokyc.MsgSetMembership',
    value: 'setMembership',
  },
  {
    name: 'MsgSetParams',
    text: '/commercionetwork.commercionetwork.commerciomint.MsgSetParams',
    value: 'setParams',
  },
  {
    name: 'MsgShareDocument',
    text: '/commercionetwork.commercionetwork.documents.MsgShareDocument',
    value: 'shareDocument',
  },
  {
    name: 'MsgStoreCode',
    text: '/cosmwasm.wasm.v1.MsgStoreCode',
    value: 'store-code',
  },
  {
    name: 'MsgSubmitProposal',
    text: '/cosmos.gov.v1beta1.MsgSubmitProposal',
    value: 'submit_proposal',
  },
  {
    name: 'MsgTransfer',
    text: '/ibc.applications.transfer.v1.MsgTransfer',
    value: '/ibc.applications.transfer.v1.MsgTransfer',
  },
  {
    name: 'MsgUndelegate',
    text: '/cosmos.staking.v1beta1.MsgUndelegate',
    value: 'begin_unbonding',
  },
  {
    name: 'MsgUnjail',
    text: '/cosmos.slashing.v1beta1.MsgUnjail',
    value: 'unjail',
  },
  {
    name: 'MsgVote',
    text: '/cosmos.gov.v1beta1.MsgVote',
    value: '/cosmos.gov.v1beta1.MsgVote',
  },
  {
    name: 'MsgWithdrawDelegatorReward',
    text: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
    value: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
  },
  {
    name: 'MsgWithdrawValidatorCommission',
    text: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
    value: '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission',
  },
]);

export default Object.freeze({
  AMOUNT_TO_LOAD: 50,
  KEY,
  MULTI_FEE: 'multi-fee',
  MULTI_TYPE: 'multi-type',
  SUPPORTED_TYPES,
});
