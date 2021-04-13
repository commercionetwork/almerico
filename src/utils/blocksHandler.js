const blocksHandler = {
  /**
   *
   * @param {Array.<Object>} blocks
   * @param {Array.<String>} prop
   * @param {Number} limit
   * @returns {Array.<Object>}
   */
  restrictBlocks({ blocks, prop, limit }) {
    const orderedBlocks = blocks.sort(
      (a, b) => b[prop[0]][prop[1]] - a[prop[0]][prop[1]],
    );
    return orderedBlocks.slice(
      orderedBlocks.length - limit,
      orderedBlocks.length,
    );
  },
};

export default blocksHandler;
