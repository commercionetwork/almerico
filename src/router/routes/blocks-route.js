import { ROUTES } from '@/constants';
import { loadView } from '../index';

const BlocksRouter = loadView('blocks/BlocksRouter');
const BlocksViewDetail = loadView('blocks/BlocksViewDetail');
const BlocksViewList = loadView('blocks/BlocksViewList');

const blocksRoute = {
  path: ROUTES.PATH.BLOCKS,
  component: BlocksRouter,
  meta: {
    title: ROUTES.TITLE.BLOCKS,
  },
  children: [
    { path: '', name: ROUTES.NAME.BLOCKS, component: BlocksViewList },
    {
      path: ROUTES.PATH.BLOCKS_DETAIL,
      name: ROUTES.NAME.BLOCKS_DETAIL,
      component: BlocksViewDetail,
      props: true,
      meta: { title: ROUTES.TITLE.BLOCKS_DETAIL },
    },
    {
      path: ROUTES.PATH.BLOCKS_LIST,
      name: ROUTES.NAME.BLOCKS_LIST,
      component: BlocksViewList,
      meta: { title: ROUTES.TITLE.BLOCKS_LIST },
    },
  ],
};

export default blocksRoute;
