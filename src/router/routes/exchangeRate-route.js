import { ROUTES } from '@/constants';
import { loadView } from '../index';

const ExchangeRateView = loadView('exchange-rate/ExchangeRateView');

const exchangeRateRoute = {
  path: ROUTES.PATH.EXCHANGE_RATE,
  name: ROUTES.NAME.EXCHANGE_RATE,
  component: ExchangeRateView,
  meta: {
    title: ROUTES.TITLE.EXCHANGE_RATE,
  },
};

export default exchangeRateRoute;
