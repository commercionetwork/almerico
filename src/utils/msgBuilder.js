import {
  MsgExecuteContract,
  MsgInstantiateContract,
} from 'cosmjs-types/cosmwasm/wasm/v1/tx';

const msgBuilder = {
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
    account,
    codeId,
    label,
    msg,
    funds = [],
  } = {}) {
    return {
      typeUrl: '/cosmwasm.wasm.v1.MsgInstantiateContract',
      value: MsgInstantiateContract.fromPartial({
        sender: account,
        admin: account,
        codeId,
        label,
        msg: new TextEncoder().encode(msg),
        funds,
      }),
    };
  },
};

export default msgBuilder;
