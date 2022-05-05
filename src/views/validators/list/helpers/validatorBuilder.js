import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager } from '@/utils';
import validatorAttendanceCalculator from '../../helpers/validatorAttendanceCalculator';

const validatorBuilder = {
  build({ rank, cumulative, data, pool, bookmarks, blocks, isLoading }) {
    const active = data.status === VALIDATORS.STATUS.BONDED ? true : false;
    const operator = data.operator_address;
    const bookmark =
      bookmarks.findIndex((address) => address === operator) > -1;
    const logo = data.logo || '';
    const moniker = data.description.moniker;
    const tokens = parseFloat(data.tokens);
    const commission = data.commission.commission_rates.rate;
    const account = _getAccountAddress(
      operator,
      CONFIG.PREFIXES.ACCOUNT.ADDRESS
    );
    const item = {
      active,
      rank: rank,
      bookmark,
      logo,
      moniker,
      operator,
      tokens,
      commission,
      account,
    };

    if (active) {
      const bondedTokens = parseFloat(pool.bonded_tokens);
      const votingPower = tokens / bondedTokens;
      item.votingPower = votingPower;
      const newCumulative = cumulative + votingPower;
      item.cumulative = newCumulative;
      if (!isLoading && blocks.length > 0) {
        item.attendance = _getAttendancePercentage(blocks, data);
      }
    }

    return item;
  },
};

export default validatorBuilder;

const _getAccountAddress = (address, prefix) => {
  const hexValue = bech32Manager.decode(address);
  return bech32Manager.encode(hexValue, prefix);
};

const _getAttendancePercentage = (blocks, validator) => {
  const definedBlocks = validatorAttendanceCalculator.getDefinedBlocks({
    blocks,
    validator,
    limit: VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT,
  });
  return (
    validatorAttendanceCalculator.getAttendanceCount(definedBlocks) /
    VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT
  );
};
