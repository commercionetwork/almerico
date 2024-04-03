import { TRANSFER } from '@/constants';

export default {
  error: (state) => state.error,
  isLoading: (state) => state.isLoading,
  isHandling: (state) => state.isHandling,
  modal: (state) => state.modal,
  connections: (state) => {
    return state.connections.map((connection) => {
      if (!connection.channels) {
        return [];
      }
      const channel = connection.channels.find((c) => c.state === 'STATE_OPEN');
      const chain = TRANSFER.CHAIN_LIST.find(
        (c) => c.chainId === connection.chain_id
      );
      const config = TRANSFER.CONFIG_LIST.find((cfg) =>
        cfg.chainIds.includes(connection.chain_id)
      );
      return {
        id: connection.id,
        chain_id: connection.chain_id,
        channel_id: channel.channel_id,
        port_id: channel.port_id,
        counterparty: channel.counterparty,
        name: chain.text,
        lcd: chain.rest,
        rpc: chain.rpc,
        hrp: config.bech32Config.bech32PrefixAccAddr,
      };
    });
  },
};
