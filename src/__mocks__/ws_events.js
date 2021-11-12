const mockTxEvent = () => {
  const item = {
    jsonrpc: '2.0',
    id: 0,
    result: {
      query: "tm.event='Tx'",
      data: {
        type: 'tendermint/event/Tx',
        value: {
          TxResult: {
            height: '1795665',
            index: 0,
            tx: '2wMoKBapCs0CijoHmgoU4j75RsCMMchGhxoeIrfVXlRNpK4SFOI++UbAjDHIRocaHiK31V5UTaSuGiRkNDQwOWZlMS1jOTU2LTQxY2MtYTg1Ni0xYTdmYzIzZWU3ZTkiZgpAOGMxZDE1MzBmYTkwZmI0YWU1NmQwZDcwYTNkYWJhMjBkMmVlZDU4ZGZmM2U3NDRkMDQ3NjQzZTUxYTFjMzQxMRoiChlmb3hzaWduLmFwcC9zaGFyZURvY3VtZW50EgUxLjAuMipAOGMxZDE1MzBmYTkwZmI0YWU1NmQwZDcwYTNkYWJhMjBkMmVlZDU4ZGZmM2U3NDRkMDQ3NjQzZTUxYTFjMzQxMTJLCkBhNGY3ZGRlZDAwMmNhNDI3Mzc3M2RhOTYzNjczNDVkYmM2ODkzMDY0ZjFlYmJkZjBhODg2M2UxZjVjMzNlZGZkEgdzaGEtMjU2EhkKEwoKdWNvbW1lcmNpbxIFMTAwMDAQwJoMGmoKJuta6YchAoku2N5kEt7hq3eemFtsDgGjJvVGxJu68/rsoX3PX6gCEkCQ46j8cWKZcTBW71QweHZou0haHZcLtzTxVKRG+yvFUhWnY/4eyJt0EX/PQGwfgkfm+O6AFzq8Ub4ySm70DYzL',
            result: {
              log: '[{"msg_index":0,"log":"Document successfully shared","events":[{"type":"message","attributes":[{"key":"action","value":"shareDocument"},{"key":"sender","value":"did:com:1ugl0j3kq3scus358rg0z9d74te2ymf9w7pfrar"}]},{"type":"new_saved_document","attributes":[{"key":"sender","value":"did:com:1ugl0j3kq3scus358rg0z9d74te2ymf9w7pfrar"},{"key":"doc_id","value":"d4409fe1-c956-41cc-a856-1a7fc23ee7e9"},{"key":"receiver_0","value":"did:com:1ugl0j3kq3scus358rg0z9d74te2ymf9w7pfrar"}]}]}]',
              gas_wanted: '200000',
              gas_used: '73417',
              events: [
                {
                  type: 'message',
                  attributes: [
                    {
                      key: 'YWN0aW9u',
                      value: 'c2hhcmVEb2N1bWVudA==',
                    },
                  ],
                },
                {
                  type: 'new_saved_document',
                  attributes: [
                    {
                      key: 'c2VuZGVy',
                      value:
                        'ZGlkOmNvbToxdWdsMGoza3Ezc2N1czM1OHJnMHo5ZDc0dGUyeW1mOXc3cGZyYXI=',
                    },
                    {
                      key: 'ZG9jX2lk',
                      value: 'ZDQ0MDlmZTEtYzk1Ni00MWNjLWE4NTYtMWE3ZmMyM2VlN2U5',
                    },
                    {
                      key: 'cmVjZWl2ZXJfMA==',
                      value:
                        'ZGlkOmNvbToxdWdsMGoza3Ezc2N1czM1OHJnMHo5ZDc0dGUyeW1mOXc3cGZyYXI=',
                    },
                  ],
                },
                {
                  type: 'message',
                  attributes: [
                    {
                      key: 'c2VuZGVy',
                      value:
                        'ZGlkOmNvbToxdWdsMGoza3Ezc2N1czM1OHJnMHo5ZDc0dGUyeW1mOXc3cGZyYXI=',
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      events: {
        'new_saved_document.sender': [
          'did:com:1ugl0j3kq3scus358rg0z9d74te2ymf9w7pfrar',
        ],
        'new_saved_document.doc_id': ['d4409fe1-c956-41cc-a856-1a7fc23ee7e9'],
        'new_saved_document.receiver_0': [
          'did:com:1ugl0j3kq3scus358rg0z9d74te2ymf9w7pfrar',
        ],
        'message.sender': ['did:com:1ugl0j3kq3scus358rg0z9d74te2ymf9w7pfrar'],
        'tm.event': ['Tx'],
        'tx.hash': [
          '17CABA7B45964381412A6851F1ED916B157A3D78C85C6DF16F1A91C74E45D7AC',
        ],
        'tx.height': ['1795665'],
        'message.action': ['shareDocument'],
      },
    },
  };
  return item;
};

export { mockTxEvent };
