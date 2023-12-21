const COMMERCIO_COLOR = Object.freeze({
  BLACK: {
    NAME: 'black',
    HEX: '#000000',
  },
  BRONZE: {
    NAME: 'bronze',
    HEX: '#6A3805',
  },
  GOLD: {
    NAME: 'gold',
    HEX: '#AF9500',
  },
  GREEN: {
    NAME: 'green',
    HEX: '#38BA8C',
  },
  SILVER: {
    NAME: 'silver',
    HEX: '#B4B4B4',
  },
});

export default Object.freeze({
  TRANSACTIONS_NUMBER: 10,
  MEMBERSHIPS: [
    {
      name: COMMERCIO_COLOR.GREEN.NAME,
      color: COMMERCIO_COLOR.GREEN.HEX,
    },
    {
      name: COMMERCIO_COLOR.BRONZE.NAME,
      color: COMMERCIO_COLOR.BRONZE.HEX,
    },
    {
      name: COMMERCIO_COLOR.SILVER.NAME,
      color: COMMERCIO_COLOR.SILVER.HEX,
    },
    {
      name: COMMERCIO_COLOR.GOLD.NAME,
      color: COMMERCIO_COLOR.GOLD.HEX,
    },
    {
      name: COMMERCIO_COLOR.BLACK.NAME,
      color: COMMERCIO_COLOR.BLACK.HEX,
    },
  ],
});
