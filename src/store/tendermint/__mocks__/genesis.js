const mockGenesis = () => {
  let item = {
    jsonrpc: "2.0",
    id: "",
    result: {
      genesis: {
        genesis_time: "2019-08-13T14:45:00Z",
        chain_id: "commercio-testnet2000",
        consensus_params: {
          block: {
            max_bytes: "22020096",
            max_gas: "-1",
            time_iota_ms: "1000"
          },
          evidence: {
            max_age: "100000"
          },
          validator: {
            pub_key_types: [
              "ed25519"
            ]
          }
        },
        app_hash: "",
        app_state: {
          mint: {
            minter: {
              inflation: "0.000000000000000000",
              annual_provisions: "0.000000000000000001"
            },
            params: {
              mint_denom: "ucommercio",
              inflation_rate_change: "0.000000000000000001",
              inflation_max: "0.000000000000000001",
              inflation_min: "0.000000000000000000",
              goal_bonded: "0.000000000000000001",
              blocks_per_year: "6311520"
            }
          },
          accounts: [{
              address: "did:com:1xng98syv4l7hpzhswd2z4xf8x2k4fm83tjvcl0",
              coins: [{
                denom: "ucommercio",
                amount: "59700000000000"
              }],
              sequence_number: "0",
              account_number: "0",
              original_vesting: [],
              delegated_free: [],
              delegated_vesting: [],
              start_time: "0",
              end_time: "0",
              module_name: "",
              module_permissions: [
                ""
              ]
            },
            {
              address: "did:com:13y8f38ktepp2v4ul3qlk0tczv9vdg5ha676axq",
              coins: [{
                denom: "ucommercio",
                amount: "100000000000"
              }],
              sequence_number: "0",
              account_number: "0",
              original_vesting: [],
              delegated_free: [],
              delegated_vesting: [],
              start_time: "0",
              end_time: "0",
              module_name: "",
              module_permissions: [
                ""
              ]
            },
            {
              address: "did:com:1qv5celt0mftut84dvaqfyllkcuztka5zvnpdvm",
              coins: [{
                denom: "ucommercio",
                amount: "100000000000"
              }],
              sequence_number: "0",
              account_number: "0",
              original_vesting: [],
              delegated_free: [],
              delegated_vesting: [],
              start_time: "0",
              end_time: "0",
              module_name: "",
              module_permissions: [
                ""
              ]
            },
            {
              address: "did:com:1vcae8m6gpjkkrpyhx8hrayrejkxjp58w5axp3t",
              coins: [{
                denom: "ucommercio",
                amount: "100000000000"
              }],
              sequence_number: "0",
              account_number: "0",
              original_vesting: [],
              delegated_free: [],
              delegated_vesting: [],
              start_time: "0",
              end_time: "0",
              module_name: "",
              module_permissions: [
                ""
              ]
            }
          ],
          slashing: {
            params: {
              max_evidence_age: "120000000000",
              signed_blocks_window: "100",
              min_signed_per_window: "0.500000000000000000",
              downtime_jail_duration: "600000000000",
              slash_fraction_double_sign: "0.050000000000000000",
              slash_fraction_downtime: "0.010000000000000000"
            },
            signing_infos: {},
            missed_blocks: {}
          },
          genutil: {
            gentxs: [{
                type: "cosmos-sdk/StdTx",
                value: {
                  msg: [{
                    type: "cosmos-sdk/MsgCreateValidator",
                    value: {
                      description: {
                        moniker: "bono",
                        identity: "",
                        website: "",
                        details: ""
                      },
                      commission: {
                        rate: "0.100000000000000000",
                        max_rate: "0.200000000000000000",
                        max_change_rate: "0.010000000000000000"
                      },
                      min_self_delegation: "1",
                      delegator_address: "did:com:1xng98syv4l7hpzhswd2z4xf8x2k4fm83tjvcl0",
                      validator_address: "did:com:valoper1xng98syv4l7hpzhswd2z4xf8x2k4fm83g347ju",
                      pubkey: "did:com:valconspub1zcjduepqtanystm39qy2lyz6dvvgn9hfxed2jj5twg3mht5kr5hwfhhf4l9stn6tht",
                      value: {
                        denom: "ucommercio",
                        amount: "100000000000"
                      }
                    }
                  }],
                  fee: {
                    amount: [],
                    gas: "200000"
                  },
                  signatures: [{
                    pub_key: {
                      type: "tendermint/PubKeySecp256k1",
                      value: "AnMnP+K0mQlYJpDXOHMK0d9PV6+F5heuoQYVTgw4w7fy"
                    },
                    signature: "TQHhl6iL32VRaCkKFQ+JsPqoc5oJ0MJfw4QV9kKx3xc4kCSPqZ30FzG6+tvyHyiqQyyGCYU81PCXSFm7+V2XTQ=="
                  }],
                  memo: "3a71a89d7b808a5a940fea4d5ec063416d017e3f@167.71.39.115:26656"
                }
              },
              {
                type: "cosmos-sdk/StdTx",
                value: {
                  msg: [{
                    type: "cosmos-sdk/MsgCreateValidator",
                    value: {
                      description: {
                        moniker: "larry",
                        identity: "",
                        website: "",
                        details: ""
                      },
                      commission: {
                        rate: "0.100000000000000000",
                        max_rate: "0.200000000000000000",
                        max_change_rate: "0.010000000000000000"
                      },
                      min_self_delegation: "1",
                      delegator_address: "did:com:1qv5celt0mftut84dvaqfyllkcuztka5zvnpdvm",
                      validator_address: "did:com:valoper1qv5celt0mftut84dvaqfyllkcuztka5z0sctpg",
                      pubkey: "did:com:valconspub1zcjduepqey9yuce5ucqw7yt9xqd3v7wxndd04qc7ke3npvmtp9d3u0a52r7sxlya8q",
                      value: {
                        denom: "ucommercio",
                        amount: "100000000000"
                      }
                    }
                  }],
                  fee: {
                    amount: [],
                    gas: "200000"
                  },
                  signatures: [{
                    pub_key: {
                      type: "tendermint/PubKeySecp256k1",
                      value: "A3xSlaTD5/mXF6SPYsTa7rUXF/qoL0wQ4eJ74n9FO6CT"
                    },
                    signature: "UJHc8/bsCMDymbRonWzrB2TfDNS2GvueXJQJHxs0BbZHiTbrXHWJKhlhQb0tLxbwEkc0pb5GpwjlX5p1jjq1yQ=="
                  }],
                  memo: "8b062a296a4dede07333dc32ee105dd1677dc3cd@167.71.62.24:26656"
                }
              },
              {
                type: "cosmos-sdk/StdTx",
                value: {
                  msg: [{
                    type: "cosmos-sdk/MsgCreateValidator",
                    value: {
                      description: {
                        moniker: "adam",
                        identity: "",
                        website: "",
                        details: ""
                      },
                      commission: {
                        rate: "0.100000000000000000",
                        max_rate: "0.200000000000000000",
                        max_change_rate: "0.010000000000000000"
                      },
                      min_self_delegation: "1",
                      delegator_address: "did:com:1vcae8m6gpjkkrpyhx8hrayrejkxjp58w5axp3t",
                      validator_address: "did:com:valoper1vcae8m6gpjkkrpyhx8hrayrejkxjp58wh7l8uc",
                      pubkey: "did:com:valconspub1zcjduepq70gaah846zjhh9s8js8lrhfcwnpaj6vqfnhydqx60wwa3kqmyzxqc2wm6g",
                      value: {
                        denom: "ucommercio",
                        amount: "100000000000"
                      }
                    }
                  }],
                  fee: {
                    amount: [],
                    gas: "200000"
                  },
                  signatures: [{
                    pub_key: {
                      type: "tendermint/PubKeySecp256k1",
                      value: "AhyqHkEtfjO5eXl4QsReAkxuxYQo9R3/C4puUDVsYtrh"
                    },
                    signature: "jEZEDYLf+RCM5GqYgHxuEM0UOJzIxyzlXuyh6OPyG1YxBuC3/Z+9oUkSgO56fGqe71IhPxXgh5DIwVjVjFpe1Q=="
                  }],
                  memo: "9cc2d5ca3262f9a99965c963a2cebe420931148a@167.71.56.41:26656"
                }
              },
              {
                type: "cosmos-sdk/StdTx",
                value: {
                  msg: [{
                    type: "cosmos-sdk/MsgCreateValidator",
                    value: {
                      description: {
                        moniker: "edge",
                        identity: "",
                        website: "",
                        details: ""
                      },
                      commission: {
                        rate: "0.100000000000000000",
                        max_rate: "0.200000000000000000",
                        max_change_rate: "0.010000000000000000"
                      },
                      min_self_delegation: "1",
                      delegator_address: "did:com:13y8f38ktepp2v4ul3qlk0tczv9vdg5ha676axq",
                      validator_address: "did:com:valoper13y8f38ktepp2v4ul3qlk0tczv9vdg5haearmtn",
                      pubkey: "did:com:valconspub1zcjduepqtgmuz45599tsmaydhnnp2uexpmuuc2njvekzv4z5u94dywk8en5slh99hx",
                      value: {
                        denom: "ucommercio",
                        amount: "100000000000"
                      }
                    }
                  }],
                  fee: {
                    amount: [],
                    gas: "200000"
                  },
                  signatures: [{
                    pub_key: {
                      type: "tendermint/PubKeySecp256k1",
                      value: "A2o3dDpP2LRa2lPP5zsT7iMjw5b31H8mgtgt13aYNT6d"
                    },
                    signature: "vcPHOCMxab5TvKhh8xdUWkX1w5+3QuebeHGygGnCEMEahsLrEubIQCLFo1kCWWtlGYBD7x12/PUYkeci4K1O+Q=="
                  }],
                  memo: "ad067538c5994093f80712130ecba1fa651286b2@167.71.49.105:26656"
                }
              }
            ]
          },
          distribution: {
            fee_pool: {
              community_pool: []
            },
            community_tax: "0.020000000000000000",
            base_proposer_reward: "0.010000000000000000",
            bonus_proposer_reward: "0.040000000000000000",
            withdraw_addr_enabled: true,
            delegator_withdraw_infos: [],
            previous_proposer: "",
            outstanding_rewards: [],
            validator_accumulated_commissions: [],
            validator_historical_rewards: [],
            validator_current_rewards: [],
            delegator_starting_infos: [],
            validator_slash_events: []
          },
          auth: {
            params: {
              max_memo_characters: "256",
              tx_sig_limit: "7",
              tx_size_cost_per_byte: "10",
              sig_verify_cost_ed25519: "590",
              sig_verify_cost_secp256k1: "1000"
            }
          },
          bank: {
            send_enabled: true
          },
          supply: {
            supply: []
          },
          commercioid: {},
          gov: {
            starting_proposal_id: "1",
            deposits: null,
            votes: null,
            proposals: null,
            deposit_params: {
              min_deposit: [{
                denom: "ucommercio",
                amount: "50000000000"
              }],
              max_deposit_period: "172800000000000"
            },
            voting_params: {
              voting_period: "172800000000000"
            },
            tally_params: {
              quorum: "0.334000000000000000",
              threshold: "0.500000000000000000",
              veto: "0.334000000000000000"
            }
          },
          staking: {
            params: {
              unbonding_time: "1814400000000000",
              max_validators: 100,
              max_entries: 7,
              bond_denom: "ucommercio"
            },
            last_total_power: "0",
            last_validator_powers: null,
            validators: null,
            delegations: null,
            unbonding_delegations: null,
            redelegations: null,
            exported: false
          },
          params: null,
          crisis: {
            constant_fee: {
              denom: "ucommercio",
              amount: "1000"
            }
          },
          commerciodocs: {}
        }
      }
    }
  };
  return item;
};

export {
  mockGenesis
};
