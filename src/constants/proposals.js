import {
  mdiCurrencyUsd,
  mdiCogOutline,
  mdiCogOffOutline,
  mdiTextBoxOutline,
  mdiTune,
} from '@mdi/js';

const STATUS = {
  UNSPECIFIED: 'PROPOSAL_STATUS_UNSPECIFIED',
  DEPOSIT_PERIOD: 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
  VOTING_PERIOD: 'PROPOSAL_STATUS_VOTING_PERIOD',
  PASSED: 'PROPOSAL_STATUS_PASSED',
  REJECTED: 'PROPOSAL_STATUS_REJECTED',
  FAILED: 'PROPOSAL_STATUS_FAILED',
};

const COLORS = {
  [STATUS.DEPOSIT_PERIOD]: 'cyan darken-2',
  [STATUS.VOTING_PERIOD]: 'indigo darken-2',
  [STATUS.PASSED]: 'light-green darken-2',
  [STATUS.REJECTED]: 'amber darken-2',
  [STATUS.FAILED]: 'pink darken-2',
};

const TEXTS = {
  [STATUS.DEPOSIT_PERIOD]: 'Deposit Period',
  [STATUS.VOTING_PERIOD]: 'Voting Period',
  [STATUS.PASSED]: 'Passed',
  [STATUS.REJECTED]: 'Rejected',
  [STATUS.FAILED]: 'Failed',
};

const TYPES = {
  CANCEL_SOFTWARE_UPGRADE: 'CancelSoftwareUpgradeProposal',
  COMMUNITY_POOL_SPEND: 'CommunityPoolSpendProposal',
  PARAMETER_CHANGE: 'ParameterChangeProposal',
  SOFTWARE_UPGRADE: 'SoftwareUpgradeProposal',
  TEXT: 'TextProposal',
};

const SUPPORTED_TYPES = [
  {
    name: TYPES.CANCEL_SOFTWARE_UPGRADE,
    text: '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
  },
  {
    name: TYPES.COMMUNITY_POOL_SPEND,
    text: '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
  },
  {
    name: TYPES.PARAMETER_CHANGE,
    text: '/cosmos.params.v1beta1.ParameterChangeProposal',
  },
  {
    name: TYPES.SOFTWARE_UPGRADE,
    text: '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
  },
  {
    name: TYPES.TEXT,
    text: '/cosmos.gov.v1beta1.TextProposal',
  },
];

const ICONS = {
  [TYPES.CANCEL_SOFTWARE_UPGRADE]: mdiCogOffOutline,
  [TYPES.COMMUNITY_POOL_SPEND]: mdiCurrencyUsd,
  [TYPES.PARAMETER_CHANGE]: mdiTune,
  [TYPES.SOFTWARE_UPGRADE]: mdiCogOutline,
  [TYPES.TEXT]: mdiTextBoxOutline,
};

const LABELS = {
  [TYPES.CANCEL_SOFTWARE_UPGRADE]: 'Cancel Software Upgrade Proposal',
  [TYPES.COMMUNITY_POOL_SPEND]: 'Community Pool Spend Proposal',
  [TYPES.PARAMETER_CHANGE]: 'Parameter Change Proposal',
  [TYPES.SOFTWARE_UPGRADE]: 'Software Upgrade Proposal',
  [TYPES.TEXT]: 'Text Proposal',
};

const VOTE_OPTIONS = [
  { tag: 'yes', value: 1, label: 'Yes' },
  { tag: 'abstain', value: 2, label: 'Abstain' },
  { tag: 'no', value: 3, label: 'No' },
  { tag: 'no_with_veto', value: 4, label: 'Veto' },
];

export const PROPOSALS = {
  COLORS,
  ICONS,
  LABELS,
  STATUS,
  SUPPORTED_TYPES,
  TEXTS,
  TYPES,
  VOTE_OPTIONS,
};
