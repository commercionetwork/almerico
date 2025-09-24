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

const TRANSACTION_TYPES = Object.freeze({
  CW20_RECEIVED: 'cw20-received',
  CW20_SENT: 'cw20-sent',
  NATIVE_RECEIVED: 'native-received',
  NATIVE_SENT: 'native-sent',
});

export default Object.freeze({
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
  TRANSACTIONS_NUMBER: 10,
  TRANSACTION_TYPES,
});
