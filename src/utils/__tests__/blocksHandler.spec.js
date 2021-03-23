import { blocksHandler } from '../index';
import { mockBlocks } from '../../store/blocks/__mocks__/blocks';

describe('utils/blocksHandler', () => {
  test("if 'restrictBlocks' function sorts descending an array of objects and limit the items number", () => {
    const items = 100;
    const wantedItems = 10;
    const blocks = mockBlocks(items).sort(() => Math.random() - 0.5);

    const restrictedBolcks = blocksHandler.restrictBlocks({
      blocks: blocks,
      prop: ['header', 'height'],
      limit: wantedItems,
    });

    expect(restrictedBolcks.length).toBe(wantedItems);
    for (const [i, block] of restrictedBolcks.entries()) {
      if (i >= wantedItems - 1) return;
      const height = parseInt(block.header.height, 10);
      const nextHeight = parseInt(restrictedBolcks[i + 1].header.height, 10);
      expect(height).toBeGreaterThan(nextHeight);
    }
  });
});
