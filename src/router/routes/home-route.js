import { ROUTES } from '@/constants';
import { loadView } from '../index';

const HomeView = loadView('home/HomeView');

const homeRoute = {
  path: ROUTES.PATH.HOME,
  name: ROUTES.NAME.HOME,
  component: HomeView,
  meta: {
    title: ROUTES.TITLE.HOME,
  },
};

export default homeRoute;
