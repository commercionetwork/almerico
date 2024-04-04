import { TRANSFER } from '@/constants';

export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  modal: (state) => state.modal,
  connections: (state) => {
    return state.connections.map((connection) => {
      const chain = TRANSFER.CHAIN_LIST.find(
        (c) => c.chainId === connection.chain_id
      );
      const config = TRANSFER.CONFIG_LIST.find((cfg) =>
        cfg.chainIds.includes(connection.chain_id)
      );
      return {
        id: connection.id,
        chain_id: connection.chain_id,
        channel_id: connection.channel.channel_id,
        port_id: connection.channel.port_id,
        counterparty: connection.channel.counterparty,
        proof_height: connection.proof_height,
        name: chain.text,
        lcd: chain.rest,
        rpc: chain.rpc,
        hrp: config.bech32Config.bech32PrefixAccAddr,
      };
    });
  },
};
