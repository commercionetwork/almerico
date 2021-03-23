const mockNodeInfo = () => {
  const item = {
    node_info: {
      protocol_version: {
        p2p: '7',
        block: '10',
        app: '0',
      },
      id: '263855c2a4f599633a5a86c79823365616a3f5cd',
      listen_addr: 'tcp://0.0.0.0:26656',
      network: 'commercio-testnet10k1',
      version: '0.33.9',
      channels: '4020212223303800',
      moniker: 'bono',
      other: {
        tx_index: 'on',
        rpc_address: 'tcp://0.0.0.0:26657',
      },
    },
    application_version: {
      name: 'commercionetwork',
      server_name: 'cnd',
      client_name: 'cndcli',
      version: '2.2.0-pre.2',
      commit: 'fab7f1d723466f02e5fa58b0d6e30ce09f8c24e3',
      build_tags: 'netgo,ledger',
      go: 'go version go1.15.6 linux/amd64',
      build_deps: ['github.com/99designs/keyring@v1.1.6'],
    },
  };
  return item;
};

export { mockNodeInfo };
