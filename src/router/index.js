import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/register',
    name: 'Register',
    meta: { layout: 'empty-layout' },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'empty-layout' },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/Planning.vue'),
  },
  {
    path: '/record',
    name: 'Record',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/Record.vue'),
  },
  {
    path: '/detail-record',
    name: 'DetailRecord',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/DetailRecord.vue'),
  },
  {
    path: '/history',
    name: 'History',
    meta: { layout: 'main-layout', auth: true },
    component: () => import('../views/History.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = firebase.auth().currentUser;
  if (user == null && to.meta.auth) {
    next('/login?action=unreg');
  } else {
    next();
  }
});

export default router;
