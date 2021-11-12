import { ROUTES } from '@/constants';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { accountRoutes } from './routes/account';
import { blocksRoutes } from './routes/blocks';
import { exchangeRateRoutes } from './routes/exchangeRate';
import { homeRoutes } from './routes/home';
import { issuesRoute } from './routes/issues';
import { transactionsRoutes } from './routes/transactions';
import { validatorsRoutes } from './routes/validators';

Vue.use(VueRouter);

const routes = [
  {
    path: ROUTES.PATH.ROOT,
    redirect: {
      path: ROUTES.PATH.HOME,
    },
  },
];

routes.push(
  accountRoutes,
  blocksRoutes,
  exchangeRateRoutes,
  homeRoutes,
  transactionsRoutes,
  validatorsRoutes,
  ...issuesRoute,
);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

export function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
