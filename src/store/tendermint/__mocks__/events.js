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
              version: {
                block: "10",
                app: "0"
              },
              chain_id: "commercio-testnet7000",
              height: "110573",
              time: "2020-04-06T12:55:15.998788228Z",
              last_block_id: {
                hash: "C38147D7A7A439C64A574720E96CCC409CF16AB765BA89EC08CE58787FC3ADC2",
                parts: {
                  total: "1",
                  hash: "9D7776D9C444FC640265910C2248D3E5E0077EFDB279B22A212CDFB40EF75803"
                }
              },
              last_commit_hash: "E06AC4D95E17A0D5E1D595A69A8E3E24FDF356B5C67BA6642AB0DEB0883B42F6",
              data_hash: "",
              validators_hash: "F3FE0F9DB519DA0945168EE58248F6E0EED759E74F2895167562D25F80F549B9",
              next_validators_hash: "F3FE0F9DB519DA0945168EE58248F6E0EED759E74F2895167562D25F80F549B9",
              consensus_hash: "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
              app_hash: "55FBF20B1A213133B99FE9B0165FB4E8A1FA155D3F763E56542D26DD78CEBB91",
              last_results_hash: "",
              evidence_hash: "",
              proposer_address: "F9742047DD71D328A1264B1FB0F63252D41852BB"
            },
            data: {
              txs
            },
            evidence: {
              evidence: null
            },
            last_commit: {
              height: "110572",
              round: "0",
              block_id: {
                hash: "C38147D7A7A439C64A574720E96CCC409CF16AB765BA89EC08CE58787FC3ADC2",
                parts: {
                  total: "1",
                  hash: "9D7776D9C444FC640265910C2248D3E5E0077EFDB279B22A212CDFB40EF75803"
                }
              },
              signatures: [
                {
                  block_id_flag: 2,
                  validator_address: "09F700F953E99803FD4A134096A65E394800638D",
                  timestamp: "2020-04-06T12:55:15.998356449Z",
                  signature: "WmHJ5Ky0YFKUiI5JML3043OkVqYTSZg36NAUrYxIrCwqLFbwbM8UcLk3Hd7f22vM+Tvna3dY+gREY/ecPPKaCA=="
                },
                {
                  block_id_flag: 2,
                  validator_address: "485D2C4154DE89BAFCC37A49D55E67F77D19A76C",
                  timestamp: "2020-04-06T12:55:16.000728908Z",
                  signature: "8Hh747zZSgzbpZugpfPnSTagj7P0ClS6Z4WKiSKNfsT0Ih0cL48HxMe+n+ejEHOrswZOn+ocBOdQTA7Tb1DxBg=="
                },
                {
                  block_id_flag: 2,
                  validator_address: "C6FE3334D0146D252CF37A0660749740D48151E7",
                  timestamp: "2020-04-06T12:55:16.003029046Z",
                  signature: "pno5xfToL4NZMwFfNW+6KiWa6dFqTQw/wPaJL5BPSM1Y0yEE3wzqv8lVRV3V9tvhCMFK4N4UOGA+C0Z3blRkDQ=="
                },
                {
                  block_id_flag: 2,
                  validator_address: "CD03BBB06E0A3E9E42C8CBEBD9CAD2BDEC579582",
                  timestamp: "2020-04-06T12:55:15.998788228Z",
                  signature: "7YdpCQTNu9cc4g5CmZznTMmGfHXAN3a5XwDcUQVlniOGK5DS55kDjsyNT5cIxxgF8Qsp1LoOAQDGQ99CBAPQDQ=="
                },
                {
                  block_id_flag: 2,
                  validator_address: "F9742047DD71D328A1264B1FB0F63252D41852BB",
                  timestamp: "2020-04-06T12:55:15.998379836Z",
                  signature: "1Ko094eYo8FNbywaq+/0eH1vrRx//TALuVWeJJ8hsm9H/FaJ4exefXREBT7Pcj0ACsf14dq+jS5Vxb8sx+C/Dg=="
                }
              ]
            }
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
                    value: "ZGlkOmNvbTp2YWxvcGVyMWZuMmE4ZWVqNnp4eWQzY2MzOWV4OGowZHdnNDJnbmt4bWdhamxh"
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
                    value: "ZGlkOmNvbTp2YWxvcGVyMWZuMmE4ZWVqNnp4eWQzY2MzOWV4OGowZHdnNDJnbmt4bWdhamxh"
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
        "transfer.recipient": [
          "did:com:1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8s5lhfv",
          "did:com:1jv65s3grqf6v6jl3dp4t6c9t9rk99cd8s5lhfv"
        ],
        "commission.validator": [
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv",
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv",
          "did:com:valoper1p8vdenej8y3lu7d9chnfp5xlthx00exd36sgym",
          "did:com:valoper1xwd66m5jr74u28kvrgjswwru5y0rhvgk0dmh0r",
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv",
          "did:com:valoper1fn2a8eej6zxyd3cc39ex8j0dwg42gnkxmgajla",
          "did:com:valoper1fn2a8eej6zxyd3cc39ex8j0dwg42gnkxmgajla"
        ],
        "rewards.validator": [
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv",
          "did:com:valoper13ew9x73g687x8u4dacvw8g84rh04dv88z8fpyv",
          "did:com:valoper1p8vdenej8y3lu7d9chnfp5xlthx00exd36sgym",
          "did:com:valoper1xwd66m5jr74u28kvrgjswwru5y0rhvgk0dmh0r",
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv",
          "did:com:valoper1fn2a8eej6zxyd3cc39ex8j0dwg42gnkxmgajla",
          "did:com:valoper1fn2a8eej6zxyd3cc39ex8j0dwg42gnkxmgajla"
        ],
        "tm.event": [
          "NewBlock"
        ],
        "transfer.amount": [
          "",
          "989ucommercio"
        ],
        "message.sender": [
          "did:com:17xpfvakm2amg962yls6f84z3kell8c5l8jcttw",
          "did:com:1dnmy5kgkh5yyrsvw6hsc939etm7337w66t83hw"
        ],
        "proposer_reward.amount": [
          ""
        ],
        "proposer_reward.validator": [
          "did:com:valoper1rk94nkzyxcq7c5u3x6v6uftvjgtcwm7a3k49pv"
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
        "rewards.amount": [
          "",
          "",
          "",
          "",
          "",
          "",
          "989.000000000000000000ucommercio"
        ]
      }
    }
  };

  return item;
};

const mockError = () => {
  let item = {
    jsonrpc: "2.0",
    error: {
      code: -32700,
      message: "Parse error. Invalid JSON",
      data: "error unmarshaling request: invalid character ':' after top-level value"
    }
  };

  return item;
};

export {
  mockNewBlock,
  mockError
};