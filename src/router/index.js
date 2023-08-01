import Vue from 'vue';
import VueRouter from 'vue-router';

import { CONFIG, ROUTES } from '@/constants';
import store from '@/store';

import { accountRoutes } from './routes/account';
import { blocksRoutes } from './routes/blocks';
import { exchangeRateRoutes } from './routes/exchangeRate';
import { homeRoutes } from './routes/home';
import { issuesRoute } from './routes/issues';
import { proposalsRoutes } from './routes/proposals';
import { statsRoutes } from './routes/stats';
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
  proposalsRoutes,
  statsRoutes,
  transactionsRoutes,
  validatorsRoutes,
  ...issuesRoute
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
