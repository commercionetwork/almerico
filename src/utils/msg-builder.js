import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';
import {
  MsgExecuteContract,
  MsgInstantiateContract,
} from 'cosmjs-types/cosmwasm/wasm/v1/tx';
import { MsgTransfer } from 'cosmjs-types/ibc/applications/transfer/v1/tx';

const msgBuilder = {
  buildMsgBeginRedelegate({ validatorAddress, srcAddress, amount, account }) {
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
      value: MsgBeginRedelegate.fromPartial({
        delegatorAddress: account,
        validatorSrcAddress: srcAddress,
        validatorDstAddress: validatorAddress,
        amount: {
          denom: 'ucommercio',
          amount: amount,
        },
      }),
    };
    return msg;
  },
  buildMsgDelegate({ validatorAddress, amount, account }) {
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: MsgDelegate.fromPartial({
        delegatorAddress: account,
        validatorAddress: validatorAddress,
        amount: {
          denom: 'ucommercio',
          amount: amount,
        },
      }),
    };
    return msg;
  },
  buildMsgExecuteContract({ sender, contract, msg, funds = [] } = {}) {
    return {
      typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
      value: MsgExecuteContract.fromPartial({
        sender,
        contract,
        msg: new TextEncoder().encode(msg),
        funds,
      }),
    };
  },
  buildMsgInstantiateContract({
    sender,
    admin,
    codeId,
    label,
    msg,
    funds = [],
  } = {}) {
    return {
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContract.fromPartial({
        sender,
        admin,
        codeId,
        label,
        msg: new TextEncoder().encode(msg),
        funds,
      }),
    };
  },
  buildMsgTransfer({
    sourcePort,
    sourceChannel,
    token,
    sender,
    receiver,
    timeoutHeight = null,
    timeoutTimestamp = '',
    memo = 'IBC transfer',
  } = {}) {
    const msg = {
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: MsgTransfer.fromPartial({
        sourcePort,
        sourceChannel,
        token,
        sender,
        receiver,
        timeoutHeight,
        timeoutTimestamp,
        memo,
      }),
    };
    return msg;
  },
  buildMsgUndelegate({ validatorAddress, amount, account }) {
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: MsgUndelegate.fromPartial({
        delegatorAddress: account,
        validatorAddress: validatorAddress,
        amount: {
          denom: 'ucommercio',
          amount: amount,
        },
      }),
    };
    return msg;
  },
  buildMsgVote({ voteOption, proposalId, account }) {
    const msg = {
      typeUrl: '/cosmos.gov.v1beta1.MsgVote',
      value: MsgVote.fromPartial({
        proposalId: proposalId,
        voter: account,
        option: voteOption,
      }),
    };
    return msg;
  },
  buildMsgWithdrawDelegatorReward({ validatorAddress, account }) {
    const msg = {
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: account,
        validatorAddress: validatorAddress,
      }),
    };
    return msg;
  },
};

export default msgBuilder;
