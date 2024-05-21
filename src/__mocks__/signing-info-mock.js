const mockSigningInfo = () => {
  const item = {
    address: 'did:com:valcons1pp3s0md64g4u25lyfhjn2ahkxper0dx6cqmzkp',
    start_height: '0',
    index_offset: '2',
    jailed_until: '2020-11-25T08:35:33.569552901Z',
    tombstoned: false,
    missed_blocks_counter: '2',
  };
  return item;
};

const mockSigningInfos = (infos = 5) => {
  const list = new Array(infos).fill(null).map(() => mockSigningInfo());
  return list;
};

export { mockSigningInfo, mockSigningInfos };
