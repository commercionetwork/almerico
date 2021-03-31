import { numberIntlFormatter } from '@/utils';
import { mockBlock, mockBlocks } from '../../../store/blocks/__mocks__/blocks';
import {
  mockValidator,
  mockValidators,
} from '../../../store/validators/__mocks__/validators';
import { mockValidatorSets } from '../../../store/validators/__mocks__/validator_sets';
import BlockProposerHandler from '../BlockProposerHandler';
import BlocksAttendanceCalculator from '../BlocksAttendanceCalculator';
import BlocksTableAdapter from '../BlocksTableAdapter';

describe('utils/blocks', () => {
  const validatorConsensusAddressPrefix = 'did:com:valcons';

  test("if 'BlockProposerHandler' class returns an empty string when error is not null", () => {
    const block = mockBlock().block;
    const validatorSets = mockValidatorSets().validators;
    const proposer = BlockProposerHandler.setError({
      message: 'error',
      status: 400,
    })
      .setBlock(block)
      .setValidators(mockValidators())
      .setValidatorsSets(validatorSets)
      .setValidatorConsensusPrefix(validatorConsensusAddressPrefix)
      .get();

    const expectedValue = '';

    expect(proposer).toBe(expectedValue);
  });

  test("if 'BlockProposerHandler' class returns the wanted proposer", () => {
    const block = mockBlock().block;
    const validatorSets = mockValidatorSets().validators;
    const proposer = BlockProposerHandler.setError(null)
      .setBlock(block)
      .setValidators(mockValidators())
      .setValidatorsSets(validatorSets)
      .setValidatorConsensusPrefix(validatorConsensusAddressPrefix)
      .get();

    expect(proposer).toStrictEqual(mockValidator());
  });

  test("if 'BlocksAttendanceCalculator' class returns the wanted attendance", () => {
    const items = 100;
    const blocks = mockBlocks(items);
    const validator = mockValidator();
    const validatorSets = mockValidatorSets().validators;
    const blocksAttendance = BlocksAttendanceCalculator.setBlocks(blocks)
      .setValidator(validator)
      .setValidatorsSet(validatorSets)
      .get();

    const expectedKeys = ['blocks', 'count', 'percentage'];

    expect(Object.keys(blocksAttendance)).toStrictEqual(expectedKeys);
    expect(blocksAttendance.blocks.length).toBe(items);
    expect(blocksAttendance.count).toBe(items);
    expect(blocksAttendance.percentage).toBe(
      numberIntlFormatter.toPercent({
        amount: items / items,
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }),
    );
  });

  test("if 'BlocksTableAdapter' class returns an array of wanted blocks", () => {
    const items = 100;
    const blocks = mockBlocks(items);
    const validators = mockValidators();
    const validatorSets = mockValidatorSets().validators;
    const convertedBlocks = BlocksTableAdapter.setBlocks(blocks)
      .setValidators(validators)
      .setValidatorsSet(validatorSets)
      .setValidatorConsensusPrefix(validatorConsensusAddressPrefix)
      .get();

    const expectedKeys = [
      'height',
      'hash',
      'moniker',
      'operator',
      'txs',
      'date',
    ];

    expect(convertedBlocks.length).toBe(items);
    for (const block of convertedBlocks) {
      expect(Object.keys(block)).toStrictEqual(expectedKeys);
    }
  });
});
