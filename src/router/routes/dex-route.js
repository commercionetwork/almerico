import { ROUTES } from '@/constants';
import { loadView } from '../index';

const DexRouter = loadView('dex/DexRouter');
const DexViewDetail = loadView('dex/DexViewDetail');
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
      name: ROUTES.NAME.DEX_DETAIL,
      component: DexViewDetail,
      props: true,
      meta: { title: ROUTES.TITLE.DEX_DETAIL },
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
