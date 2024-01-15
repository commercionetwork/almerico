import { ROUTES } from '@/constants';
import { loadView } from '../index';

const AssetsDetailRouter = loadView('assets/AssetsDetailRouter');
const AssetsRouter = loadView('assets/AssetsRouter');
const AssetsViewDetailInfo = loadView('assets/AssetsViewDetailInfo');
const AssetsViewDetailTransfer = loadView('assets/AssetsViewDetailTransfer');
const AssetsViewList = loadView('assets/AssetsViewList');
const AssetsViewNew = loadView('assets/AssetsViewNew');

const assetsRoute = {
  path: ROUTES.PATH.ASSETS,
  component: AssetsRouter,
  meta: {
    title: ROUTES.TITLE.ASSETS,
  },
  children: [
    { path: '', name: ROUTES.NAME.ASSETS, component: AssetsViewList },
    // {
    //   path: ROUTES.PATH.ASSETS_DETAIL,
    //   name: ROUTES.NAME.ASSETS_DETAIL,
    //   component: AssetsViewDetail,
    //   props: true,
    //   meta: { title: ROUTES.TITLE.ASSETS_DETAIL },
    // },
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
    {
      path: ROUTES.PATH.ASSETS_DETAIL,
      component: AssetsDetailRouter,
      props: true,
      meta: { title: ROUTES.TITLE.ASSETS_DETAIL },
      children: [
        {
          path: '',
          name: ROUTES.NAME.ASSETS_DETAIL,
          component: AssetsViewDetailInfo,
          props: true,
        },
        {
          path: ROUTES.PATH.ASSETS_DETAIL_INFO,
          name: ROUTES.NAME.ASSETS_DETAIL_INFO,
          component: AssetsViewDetailInfo,
          props: true,
          meta: { title: ROUTES.TITLE.ASSETS_DETAIL_INFO },
        },

        {
          path: ROUTES.PATH.ASSETS_DETAIL_TRANSFER,
          name: ROUTES.NAME.ASSETS_DETAIL_TRANSFER,
          component: AssetsViewDetailTransfer,
          props: true,
          meta: { title: ROUTES.TITLE.ASSETS_DETAIL_TRANSFER },
        },
      ],
    },
  ],
};

export default assetsRoute;
