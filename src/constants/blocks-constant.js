export default Object.freeze({
  TABLE_ITEMS: 30,
  SEARCH_ITEMS: 100,
  // Lowest possible block height, used to probe the node for the first
  // available height (a pruning node rejects it and reports its lowest one).
  FIRST_HEIGHT_PROBE: 1,
  LOWEST_HEIGHT_REGEX: /lowest height is (\d+)/,
});
