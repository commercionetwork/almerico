const mockChannel = (id = 1) => {
  const item = {
    state: 'STATE_OPEN',
    ordering: 'ORDER_UNORDERED',
    counterparty: {
      port_id: 'transfer',
      channel_id: 'channel-5589',
    },
    connection_hops: ['connection-10'],
    version: 'ics20-1',
    port_id: 'transfer',
    channel_id: `channel-&ì${id}`,
  };
  return item;
};

const mockChannels = (channels = 2) => {
  const list = new Array(channels)
    .fill(0)
    .map((_, index) => mockChannel(index));
  return list;
};

export { mockChannel, mockChannels };
