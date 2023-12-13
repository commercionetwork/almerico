import { ROUTES } from '@/constants';
import { loadView } from '../index';

const StatsRouter = loadView('stats/StatsRouter');
const StatsViewAccountsBalance = loadView('stats/StatsViewAccountsBalance');
const StatsViewDashboard = loadView('stats/StatsViewDashboard');

const statsRoute = {
  path: ROUTES.PATH.STATS,
  component: StatsRouter,
  meta: {
    title: ROUTES.TITLE.STATS,
  },
  children: [
    { path: '', name: ROUTES.NAME.STATS, component: StatsViewDashboard },
    {
      path: ROUTES.PATH.STATS_ACCOUNTS_BALANCE,
      name: ROUTES.NAME.STATS_ACCOUNTS_BALANCE,
      component: StatsViewAccountsBalance,
      meta: { title: ROUTES.TITLE.STATS_ACCOUNTS_BALANCE },
    },
    {
      path: ROUTES.PATH.STATS_DASHBOARD,
      name: ROUTES.NAME.STATS_DASHBOARD,
      component: StatsViewDashboard,
      meta: { title: ROUTES.TITLE.STATS_DASHBOARD },
    },
  ],
};

export default statsRoute;
