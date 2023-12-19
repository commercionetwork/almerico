import { ROUTES } from '@/constants';
import { loadView } from '../index';

const DexView = loadView('dex/DexView');

const dexRoute = {
  path: ROUTES.PATH.DEX,
  name: ROUTES.NAME.DEX,
  component: DexView,
  meta: {
    title: ROUTES.TITLE.DEX,
  },
};

export default dexRoute;
