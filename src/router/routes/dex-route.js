import { ROUTES } from '@/constants';
import { loadView } from '../index';

const DexRouter = loadView('dex/DexRouter');
const DexRouterDetail = loadView('dex/DexRouterDetail');
const DexViewDetailDashboard = loadView('dex/DexViewDetailDashboard');
const DexViewDetailSwap = loadView('dex/DexViewDetailSwap');
const DexViewList = loadView('dex/DexViewList');

const dexRoute = {
  path: ROUTES.PATH.DEX,
  component: DexRouter,
  meta: {
    title: ROUTES.TITLE.DEX,
  },
  children: [
    { path: '', name: ROUTES.NAME.DEX, component: DexViewList },
    {
      path: ROUTES.PATH.DEX_DETAIL,
      component: DexRouterDetail,
      meta: { title: ROUTES.TITLE.DEX_DETAIL },
      children: [
        {
          path: '',
          name: ROUTES.NAME.DEX_DETAIL,
          component: DexViewDetailDashboard,
          props: true,
        },
        {
          path: ROUTES.PATH.DEX_DETAIL_DASHBOARD,
          name: ROUTES.NAME.DEX_DETAIL_DASHBOARD,
          component: DexViewDetailDashboard,
          props: true,
          meta: {
            title: ROUTES.TITLE.DEX_DETAIL_DASHBOARD,
          },
        },
        {
          path: ROUTES.PATH.DEX_DETAIL_SWAP,
          name: ROUTES.NAME.DEX_DETAIL_SWAP,
          component: DexViewDetailSwap,
          props: true,
          meta: {
            title: ROUTES.TITLE.DEX_DETAIL_SWAP,
          },
        },
      ],
    },
    {
      path: ROUTES.PATH.DEX_LIST,
      name: ROUTES.NAME.DEX_LIST,
      component: DexViewList,
      meta: { title: ROUTES.TITLE.DEX_LIST },
    },
  ],
};

export default dexRoute;
