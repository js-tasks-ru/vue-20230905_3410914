import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),

  routes: [
    {
      name: 'index',
      path: '/',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});
router.beforeEach(async (to) => {
  if (!isAuthenticated() && !!to.meta.requireGuest) {
    return true
  }
  if (isAuthenticated() && !!to.meta.requireAuth) {
    return true
  }
  if (to.meta.requireGuest) {
    return '/'
  }
  if (to.meta.requireAuth) {
    return `/login?from=${to.path}`
  }
  if (to.path !== '/') {
    return '/'
  }
})
export { router };
