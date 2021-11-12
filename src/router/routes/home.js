import { ROUTES } from '@/constants';
import { loadView } from '../index';

const Home = loadView('home/index');

export const homeRoutes = {
  path: ROUTES.PATH.HOME,
  name: ROUTES.NAME.HOME,
  component: Home,
  meta: {
    title: ROUTES.TITLE.HOME,
  },
};
