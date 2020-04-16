const mockNodeInfo = () => {
  let item = {
    node_info: {
      protocol_version: {
        p2p: "7",
        block: "10",
        app: "0"
      },
      id: "1e219e6878d07ddb875fe2732811107e002e236b",
      listen_addr: "tcp://0.0.0.0:26656",
      network: "commercio-testnet1234",
      version: "0.32.1",
      channels: "4020212223303800",
      moniker: "edge",
      other: {
        tx_index: "on",
        rpc_address: "tcp://0.0.0.0:26657"
      }
    },
    application_version: {
      name: "commercionetwork",
      server_name: "cnd",
      client_name: "cndcli",
      version: "1.5.0",
      commit: "ade31dd66895f6a0d6720898ee2a061b8942f7b8",
      build_tags: "netgo,ledger",
      go: "go version go1.13.1 linux/amd64"
    }
  };

  return item;
};

export {
  mockNodeInfo
};