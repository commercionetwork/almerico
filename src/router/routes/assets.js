import { ROUTES } from '@/constants';
import { loadView } from '../index';

const AssetsRouter = loadView('assets/AssetsRouter');
const AssetsViewDetail = loadView('assets/AssetsViewDetail');
const AssetsViewList = loadView('assets/AssetsViewList');
const AssetsViewNew = loadView('assets/AssetsViewNew');

export const assetsRoutes = {
  path: ROUTES.PATH.ASSETS,
  component: AssetsRouter,
  meta: {
    title: ROUTES.TITLE.ASSETS,
  },
  children: [
    { path: '', name: ROUTES.NAME.ASSETS, component: AssetsViewList },
    {
      path: ROUTES.PATH.ASSETS_DETAIL,
      name: ROUTES.NAME.ASSETS_DETAIL,
      component: AssetsViewDetail,
      props: true,
      meta: { title: ROUTES.TITLE.ASSETS_DETAIL },
    },
    {
      path: ROUTES.PATH.ASSETS_LIST,
      name: ROUTES.NAME.ASSETS_LIST,
      component: AssetsViewList,
      meta: { title: ROUTES.TITLE.ASSETS_LIST },
    },
    {
      path: ROUTES.PATH.ASSETS_NEW,
      name: ROUTES.NAME.ASSETS_NEW,
      component: AssetsViewNew,
      meta: { title: ROUTES.TITLE.ASSETS_NEW },
    },
  ],
};
