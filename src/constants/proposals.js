import {
  mdiCurrencyUsd,
  mdiCogOutline,
  mdiCogOffOutline,
  mdiTextBoxOutline,
  mdiTune,
} from '@mdi/js';

const STATUS = {
  UNSPECIFIED: 0,
  DEPOSIT_PERIOD: 1,
  VOTING_PERIOD: 2,
  PASSED: 3,
  REJECTED: 4,
  FAILED: 5,
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
  ICONS,
  STATUS,
  TYPES,
};
