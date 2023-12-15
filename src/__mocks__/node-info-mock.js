export const mockNodeInfo = () => {
  const item = {
    node_info: {
      protocol_version: {
        p2p: '8',
        block: '11',
        app: '0',
      },
      id: 'b9a5b42aba9d5b962a4a9d478d364e9614f17b63',
      listen_addr: 'tcp://0.0.0.0:26656',
      network: 'commercio-devnet09',
      version: '0.34.12',
      channels: '40202122233038606100',
      moniker: 'commercio-testnet-int-demo00',
      other: {
        tx_index: 'on',
        rpc_address: 'tcp://0.0.0.0:26657',
      },
    },
    application_version: {
      name: 'blog',
      server_name: '\u003cappd\u003e',
      version: '3.0.0-alpha.1-7-gf7417e46',
      commit: 'f7417e46c68e197d5a742376ae0bc17eac71bd9f',
      build_tags: '',
      go: 'go version go1.17.2 linux/amd64',
      build_deps: ['github.com/99designs/keyring@v1.1.6'],
      cosmos_sdk_version: 'v0.44.2',
    },
  };
  return item;
};
