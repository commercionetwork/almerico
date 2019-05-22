import Vue from "vue";
import Router from "vue-router";
import {
  ROUTES,
  ROUTE_NAMES
} from "Constants";

Vue.use(Router)

function loadView(view) {
  return () => import( /* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}
const Dashboard = loadView("Dashboard");
// error
const NotFound = loadView("NotFound");
const ServerUnreachable = loadView("ServerUnreachable");

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [{
      path: ROUTES.ROOT,
      redirect: {
        name: ROUTE_NAMES.DASHBOARD
      }
    },
    {
      path: ROUTES.DASHBOARD,
      name: ROUTE_NAMES.DASHBOARD,
      component: Dashboard,
    },
    // not found
    {
      path: ROUTES.NOT_FOUND,
      name: ROUTE_NAMES.NOT_FOUND,
      component: NotFound
    },
    {
      path: "*",
      redirect: ROUTES.NOT_FOUND
    },
    // server unreachable
    {
      path: ROUTES.SERVER_UNREACHABLE,
      name: ROUTE_NAMES.SERVER_UNREACHABLE,
      component: ServerUnreachable
    }
  ]
})
