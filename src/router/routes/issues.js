import { ROUTES } from '@/constants';
import { loadView } from '../index';

const IssueNotFoundView = loadView('issues/IssueNotFoundView');

export const issuesRoute = [
  {
    path: ROUTES.PATH.NOT_FOUND,
    name: ROUTES.NAME.NOT_FOUND,
    component: IssueNotFoundView,
    meta: {
      title: ROUTES.TITLE.NOT_FOUND,
    },
  },
  {
    path: '*',
    redirect: ROUTES.PATH.NOT_FOUND,
  },
];
