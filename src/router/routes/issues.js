import { ROUTES } from '@/constants';
import { loadView } from '../index';

const NotFound = loadView('issues/NotFound');

export const issuesRoute = [
  {
    path: ROUTES.PATH.NOT_FOUND,
    name: ROUTES.NAME.NOT_FOUND,
    component: NotFound,
    meta: {
      title: ROUTES.TITLE.NOT_FOUND,
    },
  },
  {
    path: '*',
    redirect: ROUTES.PATH.NOT_FOUND,
  },
];
