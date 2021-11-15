import { mockBlocks, mockValidators } from '@/__mocks__';
import blocksTableAdapter from '../blocksTableAdapter';

describe('views/blocks/list/helpers/blocksTableAdapter', () => {
  test("if 'blocksTableAdapter.build' method return an array of wanted blocks", () => {
    const items = 10;
    const blocks = mockBlocks(items);
    const validators = mockValidators();
    const validatorConsensusAddressPrefix = 'did:com:valcons';
    const tableRows = blocksTableAdapter.build({
      blocks,
      validators,
      prefix: validatorConsensusAddressPrefix,
    });

    const expectedKeys = [
      'height',
      'hash',
      'moniker',
      'operator',
      'txs',
      'date',
    ];

    expect(tableRows.length).toBe(items);
    for (const row of tableRows) {
      expect(Object.keys(row)).toStrictEqual(expectedKeys);
    }
  });
});
