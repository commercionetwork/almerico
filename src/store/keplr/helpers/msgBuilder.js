import { MsgWithdrawDelegatorReward } from 'cosmjs-types/cosmos/distribution/v1beta1/tx';
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx';
import {
  MsgBeginRedelegate,
  MsgDelegate,
  MsgUndelegate,
} from 'cosmjs-types/cosmos/staking/v1beta1/tx';

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
