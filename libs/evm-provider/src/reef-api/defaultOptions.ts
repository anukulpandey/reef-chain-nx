// @ts-nocheck
import { ApiOptions } from '@polkadot/api/types';

export const defaultOptions: ApiOptions = {
  types: {
    CallOf: 'Call',
    DispatchTime: { _enum: { At: 'BlockNumber', After: 'BlockNumber' } },
    ScheduleTaskIndex: 'u32',
    DelayedOrigin: { delay: 'BlockNumber', origin: 'PalletsOrigin' },
    AuthorityOrigin: 'DelayedOrigin',
    StorageValue: 'Vec<u8>',
    GraduallyUpdate: {
      key: 'StorageKey',
      targetValue: 'StorageValue',
      perBlock: 'StorageValue'
    },
    StorageKeyBytes: 'Vec<u8>',
    StorageValueBytes: 'Vec<u8>',
    RpcDataProviderId: 'Text',
    DataProviderId: 'u8',
    TimestampedValue: { value: 'OracleValue', timestamp: 'Moment' },
    TimestampedValueOf: 'TimestampedValue',
    OrderedSet: 'Vec<AccountId>',
    OrmlAccountData: {
      free: 'Balance',
      reserved: 'Balance',
      frozen: 'Balance'
    },
    OrmlBalanceLock: { amount: 'Balance', id: 'LockIdentifier' },
    AuctionInfo: {
      bid: 'Option<(AccountId, Balance)>',
      start: 'BlockNumber',
      end: 'Option<BlockNumber>'
    },
    DelayedDispatchTime: { _enum: { At: 'BlockNumber', After: 'BlockNumber' } },
    DispatchId: 'u32',
    Price: 'FixedU128',
    OrmlVestingSchedule: {
      start: 'BlockNumber',
      period: 'BlockNumber',
      periodCount: 'u32',
      perPeriod: 'Compact<Balance>'
    },
    VestingScheduleOf: 'OrmlVestingSchedule',
    OrmlCurrencyId: 'u8',
    PoolInfo: {
      totalShares: 'Share',
      rewards: 'BTreeMap<OrmlCurrencyId, (Balance, Balance)>'
    },
    CompactBalance: 'Compact<Balance>',
    PoolInfoV0: {
      totalShares: 'Compact<Share>',
      totalRewards: 'CompactBalance',
      totalWithdrawnRewards: 'CompactBalance'
    },
    Share: 'u128',
    OracleValue: 'Price',
    PalletBalanceOf: 'Balance',
    EstimateResourcesResponse: {
      gas: 'u256',
      storage: 'i32',
      weightFee: 'u256'
    },
    EvmAccountInfo: {
      nonce: 'Index',
      contractInfo: 'Option<EvmContractInfo>',
      developerDeposit: 'Option<Balance>'
    },
    CodeInfo: { codeSize: 'u32', refCount: 'u32' },
    EvmContractInfo: { codeHash: 'H256', maintainer: 'H160', deployed: 'bool' },
    EvmAddress: 'H160',
    CallRequest: {
      from: 'Option<H160>',
      to: 'Option<H160>',
      gasLimit: 'Option<u32>',
      storageLimit: 'Option<u32>',
      value: 'Option<U128>',
      data: 'Option<Bytes>'
    },
    CommitmentOf: {
      duration: 'LockDuration',
      amount: 'BalanceOf',
      candidate: 'AccountId'
    },
    Era: { index: 'u32', start: 'BlockNumber' },
    LockDuration: { _enum: ['OneMonth', 'OneYear', 'TenYears'] },
    PoolId: {
      _enum: {
        Loans: 'CurrencyId',
        DexIncentive: 'CurrencyId',
        DexSaving: 'CurrencyId',
        Homa: 'Null'
      }
    },
    Amount: 'i128',
    AmountOf: 'Amount',
    AuctionId: 'u32',
    AuctionIdOf: 'AuctionId',
    TokenSymbol: { _enum: { REEF: 0, RUSD: 1 } },
    CurrencyId: {
      _enum: {
        Token: 'TokenSymbol',
        DEXShare: '(TokenSymbol, TokenSymbol)',
        ERC20: 'EvmAddress'
      }
    },
    CurrencyIdOf: 'CurrencyId',
    AuthoritysOriginId: { _enum: ['Root'] },
    TradingPair: '(CurrencyId,  CurrencyId)',
    OracleKey: 'CurrencyId',
    AsOriginId: 'AuthoritysOriginId',
    ExchangeRate: 'FixedU128',
    Rate: 'FixedU128',
    Ratio: 'FixedU128',
    Keys: 'SessionKeys4',
    PalletsOrigin: {
      _enum: {
        System: 'SystemOrigin',
        Timestamp: 'Null',
        RandomnessCollectiveFlip: 'Null',
        Balances: 'Null',
        Accounts: 'Null',
        Currencies: 'Null',
        Tokens: 'Null',
        Vesting: 'Null',
        AcalaTreasury: 'Null',
        Utility: 'Null',
        Multisig: 'Null',
        Recovery: 'Null',
        Proxy: 'Null',
        Scheduler: 'Null',
        Indices: 'Null',
        GraduallyUpdate: 'Null',
        Authorship: 'Null',
        Babe: 'Null',
        Grandpa: 'Null',
        Staking: 'Null',
        Session: 'Null',
        Historical: 'Null',
        GeneralCouncil: 'CollectiveOrigin',
        GeneralCouncilMembership: 'Null',
        HonzonCouncil: 'CollectiveOrigin',
        HonzonCouncilMembership: 'Null',
        HomaCouncil: 'CollectiveOrigin',
        HomaCouncilMembership: 'Null',
        TechnicalCommittee: 'CollectiveOrigin',
        TechnicalCommitteeMembership: 'Null',
        Authority: 'DelayedOrigin',
        ElectionsPhragmen: 'Null',
        AcalaOracle: 'Null',
        BandOracle: 'Null',
        OperatorMembershipAcala: 'Null',
        OperatorMembershipBand: 'Null',
        Auction: 'Null',
        Rewards: 'Null',
        OrmlNFT: 'Null',
        Prices: 'Null',
        Dex: 'Null',
        AuctionManager: 'Null',
        Loans: 'Null',
        Honzon: 'Null',
        CdpTreasury: 'Null',
        CdpEngine: 'Null',
        EmergencyShutdown: 'Null',
        Homa: 'Null',
        NomineesElection: 'Null',
        StakingPool: 'Null',
        PolkadotBridge: 'Null',
        Incentives: 'Null',
        AirDrop: 'Null',
        NFT: 'Null',
        RenVmBridge: 'Null',
        Contracts: 'Null',
        EVM: 'Null',
        Sudo: 'Null',
        TransactionPayment: 'Null'
      }
    }
  },
  rpc: {
    oracle: {
      getValue: {
        description: 'Retrieves the oracle value for a given key.',
        params: [
          { name: 'providerId', type: 'RpcDataProviderId' },
          { name: 'key', type: 'OracleKey' },
          { name: 'at', type: 'BlockHash', isHistoric: true, isOptional: true }
        ],
        type: 'Option<TimestampedValue>'
        // isSubscription: false,
        // jsonrpc: "oracle_getValue",
        // method: "getValue",
        // section: "oracle",
      },
      getAllValues: {
        description: 'Retrieves all oracle values.',
        params: [
          { name: 'providerId', type: 'RpcDataProviderId' },
          { name: 'at', type: 'BlockHash', isHistoric: true, isOptional: true }
        ],
        type: 'Vec<(OracleKey, Option<TimestampedValue>)>'
        // isSubscription: false,
        // jsonrpc: "oracle_getAllValues",
        // method: "getAllValues",
        // section: "oracle",
      }
    },
    tokens: {
      queryExistentialDeposit: {
        description: 'Query Existential Deposit for a given currency.',
        params: [
          { name: 'currencyId', type: 'CurrencyId' },
          { name: 'at', type: 'BlockHash', isHistoric: true, isOptional: true }
        ],
        type: 'NumberOrHex'
        // isSubscription: false,
        // jsonrpc: "tokens_queryExistentialDeposit",
        // method: "queryExistentialDeposit",
        // section: "tokens",
      }
    },
    evm: {
      call: {
        description: 'eth call',
        params: [
          { name: 'data', type: 'CallRequest' },
          { name: 'at', type: 'BlockHash', isHistoric: true, isOptional: true }
        ],
        type: 'Raw'
        // isSubscription: false,
        // jsonrpc: "evm_call",
        // method: "call",
        // section: "evm",
      },
      estimateGas: {
        description: 'eth estimateGas',
        params: [
          { name: 'data', type: 'CallRequest' },
          { name: 'at', type: 'BlockHash', isHistoric: true, isOptional: true }
        ],
        type: 'u128'
        // isSubscription: false,
        // jsonrpc: "evm_estimateGas",
        // method: "estimateGas",
        // section: "evm",
      },
      estimateResources: {
        description: 'eth estimateResources',
        params: [
          { name: 'from', type: 'H160' },
          { name: 'unsignedExtrinsic', type: 'Bytes' },
          { name: 'at', type: 'BlockHash', isHistoric: true, isOptional: true }
        ],
        type: 'EstimateResourcesResponse'
        // isSubscription: false,
        // jsonrpc: "evm_estimateResources",
        // method: "estimateResources",
        // section: "evm",
      }
    }
  },
  typesAlias: {
    evm: { AccountInfo: 'EvmAccountInfo', ContractInfo: 'EvmContractInfo' },
    tokens: { AccountData: 'OrmlAccountData', BalanceLock: 'OrmlBalanceLock' }
  },
  // derives: { currencies: {}, constants: {} },
  typesBundle: {
    spec: {
      acala: {
        types: [
          {
            minmax: [600, 699],
            types: {
              Address: 'LookupSource',
              LookupSource: 'IndicesLookupSource',
              TokenSymbol: {
                _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
              }
            }
          },
          {
            minmax: [700, 719],
            types: {
              Address: 'GenericMultiAddress',
              LookupSource: 'GenericMultiAddress',
              TokenSymbol: {
                _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
              }
            }
          },
          {
            minmax: [720, null],
            types: {
              Address: 'GenericMultiAddress',
              LookupSource: 'GenericMultiAddress'
            }
          }
        ]
      },
      mandala: {
        types: [
          {
            minmax: [600, 699],
            types: {
              Address: 'LookupSource',
              LookupSource: 'IndicesLookupSource',
              TokenSymbol: {
                _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
              }
            }
          },
          {
            minmax: [700, 719],
            types: {
              Address: 'GenericMultiAddress',
              LookupSource: 'GenericMultiAddress',
              TokenSymbol: {
                _enum: ['ACA', 'AUSD', 'DOT', 'XBTC', 'LDOT', 'RENBTC']
              }
            }
          },
          {
            minmax: [720, null],
            types: {
              Address: 'GenericMultiAddress',
              LookupSource: 'GenericMultiAddress'
            }
          }
        ]
      }
    }
  },
  signedExtensions: { SetEvmOrigin: { extrinsic: {}, payload: {} } }
};
