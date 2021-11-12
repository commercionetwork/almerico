import { ROUTES } from '@/constants';
import { loadView } from '../index';

const ExchangeRate = loadView('exchange-rate/index');

export const exchangeRateRoutes = {
  path: ROUTES.PATH.EXCHANGE_RATE,
  name: ROUTES.NAME.EXCHANGE_RATE,
  component: ExchangeRate,
  meta: {
    title: ROUTES.TITLE.EXCHANGE_RATE,
  },
};
