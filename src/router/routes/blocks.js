import { ROUTES } from '@/constants';
import { loadView } from '../index';

const Blocks = loadView('blocks/index');
const BlocksDetail = loadView('blocks/BlocksDetail');
const BlocksList = loadView('blocks/BlocksList');

export const blocksRoutes = {
  path: ROUTES.PATH.BLOCKS,
  component: Blocks,
  meta: {
    title: ROUTES.TITLE.BLOCKS,
  },
  children: [
    { path: '', name: ROUTES.NAME.BLOCKS, component: BlocksList },
    {
      path: ROUTES.PATH.BLOCKS_DETAIL,
      name: ROUTES.NAME.BLOCKS_DETAIL,
      component: BlocksDetail,
      meta: { title: ROUTES.TITLE.BLOCKS_DETAIL },
    },
    {
      path: ROUTES.PATH.BLOCKS_LIST,
      name: ROUTES.NAME.BLOCKS_LIST,
      component: BlocksList,
      meta: { title: ROUTES.TITLE.BLOCKS_LIST },
    },
  ],
};
