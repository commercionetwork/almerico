import { ROUTES } from '@/constants';
import { loadView } from '../index';

const IssueNotFoundView = loadView('issues/IssueNotFoundView');
const WorkInProgress = loadView('issues/WorkInProgress');

export const issuesRoute = [
  {
    path: ROUTES.PATH.WORK_IN_PROGRESS,
    name: ROUTES.NAME.WORK_IN_PROGRESS,
    component: WorkInProgress,
    meta: {
      title: ROUTES.TITLE.WORK_IN_PROGRESS,
    },
  },
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
