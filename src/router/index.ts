import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';

Vue.use(VueRouter);

// 系统子菜单配置于/src/systemConfig/menuList
const routes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/home',
  }, {
    path: '/home',
    component: () => import('../views/home.vue'),
  },
];

const router = new VueRouter();

router.addRoutes([...routes]);

export default router;
