import Vue from 'vue';
import VueRouter from 'vue-router';

import { CONFIG, ROUTES } from '@/constants';
import store from '@/store';

import accountRoute from './routes/account-route';
import assetsRoute from './routes/assets-route';
import blocksRoute from './routes/blocks-route';
import dexRoute from './routes/dex-route';
import exchangeRateRoute from './routes/exchangeRate-route';
import homeRoute from './routes/home-route';
import issueRoutes from './routes/issue-routes';
import proposalsRoute from './routes/proposals-route';
import statsRoute from './routes/stats-route';
import transactionsRoute from './routes/transactions-route';
import validatorsRoute from './routes/validators-route';

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
  accountRoute,
  assetsRoute,
  blocksRoute,
  dexRoute,
  exchangeRateRoute,
  homeRoute,
  proposalsRoute,
  statsRoute,
  transactionsRoute,
  validatorsRoute,
  ...issueRoutes
);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            selector: to.hash,
            behavior: CONFIG.SCROLL.BEHAVIOR,
            offset: { x: CONFIG.SCROLL.OFFSET_X, y: CONFIG.SCROLL.OFFSET_Y },
          });
        }, 500);
      });
    }
  },
});

router.beforeEach(async (to, _from, next) => {
  if (
    to.name === ROUTES.NAME.WORK_IN_PROGRESS &&
    store.getters['application/isMaintenance']
  ) {
    next();
    return;
  }

  await store.dispatch('application/fetchHealth');
  if (store.getters['application/isMaintenance']) {
    next({ name: ROUTES.NAME.WORK_IN_PROGRESS });
    return;
  }

  next();
  return;
});

export default router;

export function loadView(view) {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
