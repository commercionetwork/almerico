import { CONFIG, ROUTES } from '@/constants';
import { loadView } from '../index';

const PoolsRouter = loadView('pools/PoolsRouter');
const PoolsRouterDetail = loadView('pools/PoolsRouterDetail');
const PoolsViewDetailDashboard = loadView('pools/PoolsViewDetailDashboard');
const PoolsViewDetailSwap = loadView('pools/PoolsViewDetailSwap');
const PoolsViewList = loadView('pools/PoolsViewList');

const poolsRoute = {
  path: ROUTES.PATH.POOLS,
  component: PoolsRouter,
  beforeEnter: (to, from, next) => {
    if (!CONFIG.HAS_POOLS) {
      next({ name: ROUTES.NAME.DEX });
      return;
    }
  },
  meta: {
    title: ROUTES.TITLE.POOLS,
  },
  children: [
    { path: '', name: ROUTES.NAME.POOLS, component: PoolsViewList },
    {
      path: ROUTES.PATH.POOLS_DETAIL,
      component: PoolsRouterDetail,
      meta: { title: ROUTES.TITLE.POOLS_DETAIL },
      children: [
        {
          path: '',
          name: ROUTES.NAME.POOLS_DETAIL,
          component: PoolsViewDetailDashboard,
          props: true,
        },
        {
          path: ROUTES.PATH.POOLS_DETAIL_DASHBOARD,
          name: ROUTES.NAME.POOLS_DETAIL_DASHBOARD,
          component: PoolsViewDetailDashboard,
          props: true,
          meta: {
            title: ROUTES.TITLE.POOLS_DETAIL_DASHBOARD,
          },
        },
        {
          path: ROUTES.PATH.POOLS_DETAIL_SWAP,
          name: ROUTES.NAME.POOLS_DETAIL_SWAP,
          component: PoolsViewDetailSwap,
          props: true,
          meta: {
            title: ROUTES.TITLE.POOLS_DETAIL_SWAP,
          },
        },
      ],
    },
    {
      path: ROUTES.PATH.POOLS_LIST,
      name: ROUTES.NAME.POOLS_LIST,
      component: PoolsViewList,
      meta: { title: ROUTES.TITLE.POOLS_LIST },
    },
  ],
};

export default poolsRoute;
