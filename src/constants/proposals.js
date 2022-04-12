import {
  mdiCurrencyUsd,
  mdiCogOutline,
  mdiCogOffOutline,
  mdiTextBoxOutline,
  mdiTune,
} from '@mdi/js';

const STATUS = {
  UNSPECIFIED: { ID: 0, CODE: 'PROPOSAL_STATUS_UNSPECIFIED' },
  DEPOSIT_PERIOD: { ID: 1, CODE: 'PROPOSAL_STATUS_DEPOSIT_PERIOD' },
  VOTING_PERIOD: { ID: 2, CODE: 'PROPOSAL_STATUS_VOTING_PERIOD' },
  PASSED: { ID: 3, CODE: 'PROPOSAL_STATUS_PASSED' },
  REJECTED: { ID: 4, CODE: 'PROPOSAL_STATUS_REJECTED' },
  FAILED: { ID: 5, CODE: 'PROPOSAL_STATUS_FAILED' },
};

const COLORS = {
  [STATUS.DEPOSIT_PERIOD.CODE]: 'cyan darken-2',
  [STATUS.VOTING_PERIOD.CODE]: 'indigo darken-2',
  [STATUS.PASSED.CODE]: 'light-green darken-2',
  [STATUS.REJECTED.CODE]: 'amber darken-2',
  [STATUS.FAILED.CODE]: 'pink darken-2',
};

const TEXTS = {
  [STATUS.DEPOSIT_PERIOD.CODE]: 'Deposit Period',
  [STATUS.VOTING_PERIOD.CODE]: 'Voting Period',
  [STATUS.PASSED.CODE]: 'Passed',
  [STATUS.REJECTED.CODE]: 'Rejected',
  [STATUS.FAILED.CODE]: 'Failed',
};

const TYPES = {
  CANCEL_SOFTWARE_UPGRADE: 'CancelSoftwareUpgradeProposal',
  COMMUNITY_POOL_SPEND: 'CommunityPoolSpendProposal',
  PARAMETER_CHANGE: 'ParameterChangeProposal',
  SOFTWARE_UPGRADE: 'SoftwareUpgradeProposal',
  TEXT: 'TextProposal',
};

const ICONS = {
  [TYPES.CANCEL_SOFTWARE_UPGRADE]: mdiCogOffOutline,
  [TYPES.COMMUNITY_POOL_SPEND]: mdiCurrencyUsd,
  [TYPES.PARAMETER_CHANGE]: mdiTune,
  [TYPES.SOFTWARE_UPGRADE]: mdiCogOutline,
  [TYPES.TEXT]: mdiTextBoxOutline,
};

export const PROPOSALS = {
  COLORS,
  ICONS,
  STATUS,
  TEXTS,
  TYPES,
};
