import { ROUTES } from '@/constants';
import { loadView } from '../index';

const ProposalsRouter = loadView('proposals/ProposalsRouter');
const ProposalsViewDetail = loadView('proposals/ProposalsViewDetail');
const ProposalsViewList = loadView('proposals/ProposalsViewList');

const proposalsRoute = {
  path: ROUTES.PATH.PROPOSALS,
  component: ProposalsRouter,
  meta: {
    title: ROUTES.TITLE.PROPOSALS,
  },
  children: [
    { path: '', name: ROUTES.NAME.PROPOSALS, component: ProposalsViewList },
    {
      path: ROUTES.PATH.PROPOSALS_DETAIL,
      name: ROUTES.NAME.PROPOSALS_DETAIL,
      component: ProposalsViewDetail,
      props: true,
      meta: { title: ROUTES.TITLE.PROPOSALS_DETAIL },
    },
    {
      path: ROUTES.PATH.PROPOSALS_LIST,
      name: ROUTES.NAME.PROPOSALS_LIST,
      component: ProposalsViewList,
      meta: { title: ROUTES.TITLE.PROPOSALS_LIST },
    },
  ],
};

export default proposalsRoute;
