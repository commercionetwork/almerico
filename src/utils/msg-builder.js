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
      typeUrl: MsgBeginRedelegate.typeUrl,
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
      typeUrl: MsgDelegate.typeUrl,
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
      typeUrl: MsgExecuteContract.typeUrl,
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
      typeUrl: MsgInstantiateContract.typeUrl,
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
    receiver,
    sender,
    sourceChannel,
    sourcePort,
    token,
    timeoutTimestamp,
  }) {
    const memo = `{"forward":{"receiver":"${receiver}","port":"${sourcePort}","channel":"${sourceChannel}"}`;
    const msg = {
      typeUrl: MsgTransfer.typeUrl,
      value: {
        receiver,
        sender,
        sourceChannel,
        sourcePort,
        timeoutTimestamp,
        token: {
          amount: token.amount,
          denom: token.denom,
        },
        memo,
      },
    };
    return msg;
  },
  buildMsgUndelegate({ validatorAddress, amount, account }) {
    const msg = {
      typeUrl: MsgUndelegate.typeUrl,
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
      typeUrl: MsgVote.typeUrl,
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
      typeUrl: MsgWithdrawDelegatorReward.typeUrl,
      value: MsgWithdrawDelegatorReward.fromPartial({
        delegatorAddress: account,
        validatorAddress: validatorAddress,
      }),
    };
    return msg;
  },
};

export default msgBuilder;
