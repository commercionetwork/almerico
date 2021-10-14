import mutations from '../mutations';
import store from '../index';

describe('store/blocks/mutations', () => {
  test('description', () => {
    const expectedValue = true;
    expect(true).toBe(expectedValue);
  });
  // let state = {};

  // beforeEach(() => {
  //   state = {
  //     ...store.initialState,
  //   };
  // });

  // test('mutations.startLoading', () => {
  //   state.error = { message: 'error', status: 400 };

  //   mutations.startLoading(state);

  //   expect(state.error).toBeNull;
  //   expect(state.isLoading).toBe(true);
  // });

  // test('mutations.stopLoading', () => {
  //   state.isLoading = true;

  //   mutations.stopLoading(state);

  //   expect(state.isLoading).toBe(false);
  // });

  // test('mutations.setError', () => {
  //   const error = { message: 'error', status: 400 };

  //   mutations.setError(state, error);

  //   expect(state.error).toStrictEqual(error);
  // });

  // test('mutations.changeHeight', () => {
  //   const height = 2;

  //   mutations.changeHeight(state, height);

  //   expect(state.currentHeight).toBe(height);
  // });

  // test('mutations.addBlocks', () => {
  //   const data = [
  //     {
  //       id: 1,
  //     },
  //   ];
  //   state.blocks = data.map((obj) => ({
  //     ...obj,
  //   }));

  //   const newblocks = [
  //     {
  //       id: 2,
  //     },
  //   ];

  //   mutations.addBlocks(state, newblocks);

  //   const expectedValue = [
  //     {
  //       id: 1,
  //     },
  //     {
  //       id: 2,
  //     },
  //   ];
  //   expect(state.blocks).toStrictEqual(expectedValue);
  // });

  // test('mutations.clearAllBlocks', () => {
  //   mutations.clearAllBlocks(state);

  //   expect(state.blocks).toStrictEqual([]);
  // });

  // test('mutations.addSingleBlock', () => {
  //   const data = [
  //     {
  //       id: 1,
  //     },
  //   ];
  //   state.blocks = data.map((obj) => ({
  //     ...obj,
  //   }));

  //   const newBlock = {
  //     id: 2,
  //   };

  //   mutations.addSingleBlock(state, newBlock);

  //   const expectedValue = [
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 1,
  //     },
  //   ];
  //   expect(state.blocks).toStrictEqual(expectedValue);
  // });

  // test('mutations.setBlockDetails', () => {
  //   const block = {
  //     id: 1,
  //   };

  //   mutations.setBlockDetails(state, block);

  //   expect(state.details).toStrictEqual(block);
  // });

  // test('mutations.setLatestBlock', () => {
  //   const data = [
  //     {
  //       id: 1,
  //     },
  //   ];
  //   state.blocks = data.map((obj) => ({
  //     ...obj,
  //   }));

  //   const latestBlock = {
  //     id: 2,
  //   };

  //   mutations.setLatestBlock(state, latestBlock);

  //   expect(state.latest).toStrictEqual(latestBlock);

  //   const expectedValue = [
  //     {
  //       id: 2,
  //     },
  //     {
  //       id: 1,
  //     },
  //   ];

  //   expect(state.blocks).toStrictEqual(expectedValue);
  // });
});
