const mockNewBlock = (txs = null) => {
  let item = {
    jsonrpc: "2.0",
    id: 0,
    result: {
      query: "tm.event='NewBlock'",
      data: {
        type: "tendermint/event/NewBlock",
        value: {
          block: {
            header: {
              height: 1
            },
            data: {
              txs,
            },
            evidence: {},
            last_commit: {}
          },
          result_begin_block: {
            events: [
              {
                type: "transfer",
                attributes: [
                  {
                    key: "cmVjaXBpZW50",
                    value: "ZGlkOmNvbToxanY2NXMzZ3JxZjZ2NmpsM2RwNHQ2Yzl0OXJrOTljZDhzNWxoZnY="
                  },
                  {
                    key: "YW1vdW50",
                    value: ""
                  }
                ]
              },
              {
                type: "message",
                attributes: [
                  {
                    key: "c2VuZGVy",
                    value: "ZGlkOmNvbToxN3hwZnZha20yYW1nOTYyeWxzNmY4NHoza2VsbDhjNWw4amN0dHc="
                  }
                ]
              },
              {
                type: "proposer_reward",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMTNldzl4NzNnNjg3eDh1NGRhY3Z3OGc4NHJoMDRkdjg4ejhmcHl2"
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMTNldzl4NzNnNjg3eDh1NGRhY3Z3OGc4NHJoMDRkdjg4ejhmcHl2"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMTNldzl4NzNnNjg3eDh1NGRhY3Z3OGc4NHJoMDRkdjg4ejhmcHl2"
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMTNldzl4NzNnNjg3eDh1NGRhY3Z3OGc4NHJoMDRkdjg4ejhmcHl2"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMTNldzl4NzNnNjg3eDh1NGRhY3Z3OGc4NHJoMDRkdjg4ejhmcHl2"
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXA4dmRlbmVqOHkzbHU3ZDljaG5mcDV4bHRoeDAwZXhkMzZzZ3lt"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXA4dmRlbmVqOHkzbHU3ZDljaG5mcDV4bHRoeDAwZXhkMzZzZ3lt"
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXh3ZDY2bTVqcjc0dTI4a3ZyZ2pzd3dydTV5MHJodmdrMGRtaDBy"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXh3ZDY2bTVqcjc0dTI4a3ZyZ2pzd3dydTV5MHJodmdrMGRtaDBy"
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXJrOTRua3p5eGNxN2M1dTN4NnY2dWZ0dmpndGN3bTdhM2s0OXB2"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXJrOTRua3p5eGNxN2M1dTN4NnY2dWZ0dmpndGN3bTdhM2s0OXB2"
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMWZuMmE4ZWVqNnp4eWQzY2MzOWV4OGowZHdnNDJnbmt4bWdhamxh"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: ""
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMWZuMmE4ZWVqNnp4eWQzY2MzOWV4OGowZHdnNDJnbmt4bWdhamxh"
                  }
                ]
              },
              {
                type: "transfer",
                attributes: [
                  {
                    key: "cmVjaXBpZW50",
                    value: "ZGlkOmNvbToxanY2NXMzZ3JxZjZ2NmpsM2RwNHQ2Yzl0OXJrOTljZDhzNWxoZnY="
                  },
                  {
                    key: "YW1vdW50",
                    value: "OTg5dWNvbW1lcmNpbw=="
                  }
                ]
              },
              {
                type: "message",
                attributes: [
                  {
                    key: "c2VuZGVy",
                    value: "ZGlkOmNvbToxZG5teTVrZ2toNXl5cnN2dzZoc2M5MzlldG03MzM3dzY2dDgzaHc="
                  }
                ]
              },
              {
                type: "commission",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: "OTguOTAwMDAwMDAwMDAwMDAwMDAwdWNvbW1lcmNpbw=="
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXh3ZDY2bTVqcjc0dTI4a3ZyZ2pzd3dydTV5MHJodmdrMGRtaDBy"
                  }
                ]
              },
              {
                type: "rewards",
                attributes: [
                  {
                    key: "YW1vdW50",
                    value: "OTg5LjAwMDAwMDAwMDAwMDAwMDAwMHVjb21tZXJjaW8="
                  },
                  {
                    key: "dmFsaWRhdG9y",
                    value: "ZGlkOmNvbTp2YWxvcGVyMXh3ZDY2bTVqcjc0dTI4a3ZyZ2pzd3dydTV5MHJodmdrMGRtaDBy"
                  }
                ]
              }
            ]
          },
          result_end_block: {
            validator_updates: []
          }
        }
      },
      events: {
        "transfer.amount": [
          "",
          "989ucommercio"
        ],
        "proposer_reward.amount": [
          ""
        ],
        "tm.event": [
          "NewBlock"
        ],
        "commission.amount": [
          "",
          "",
          "",
          "",
          "",
          "",
          "98.900000000000000000ucommercio"
        ],
        "commission.validator": [
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv",
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv",
          "did:com:valoper1p8vdenej8y3lu7d9chnfp5xlthx00exd36sgym",
          "did:com:valoper1xwd66m5jr74u28kvrgjswwru5y0rhvgk0dmh0r",
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv",
          "did:com:valoper1fn2a8eej6zxyd3cc39ex8j0dwg42gnkxmgajla",
          "did:com:valoper1xwd66m5jr74u28kvrgjswwru5y0rhvgk0dmh0r"
        ],
        "rewards.amount": [
          "",
          "",
          "",
          "",
          "",
          "",
          "989.000000000000000000ucommercio"
        ],
        "rewards.validator": [
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv",
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv",
          "did:com:valoper1p8vdenej8y3lu7d9chnfp5xlthx00exd36sgym",
          "did:com:valoper1xwd66m5jr74u28kvrgjswwru5y0rhvgk0dmh0r",
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv",
          "did:com:valoper1fn2a8eej6zxyd3cc39ex8j0dwg42gnkxmgajla",
          "did:com:valoper1xwd66m5jr74u28kvrgjswwru5y0rhvgk0dmh0r"
        ],
        "transfer.recipient": [
          "did:com:1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8s5lhfv",
          "did:com:1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8s5lhfv"
        ],
        "message.sender": [
          "did:com:17xpfvakm2amg962yls6f84z3kell8c5l8jcttw",
          "did:com:1dnmy5kgkh5yyrsvw6hsc939etm7337w66t83hw"
        ],
        "proposer_reward.validator": [
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv"
        ]
      }
    }
  };
  return item;
};

export {
  mockNewBlock
};