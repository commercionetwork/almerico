const blocksHandler = {
  restrictBlocks({ blocks, prop, limit }) {
    const orderedBlocks = blocks.sort(
      (a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]]
    );
    return orderedBlocks.slice(
      orderedBlocks.length - limit,
      orderedBlocks.length
    );
  },
};

export default blocksHandler;
