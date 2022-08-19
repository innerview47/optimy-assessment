import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "home",
      component: HomeView,
    },
    {
      path: '/crud',
      name: "crud",
      component: () => import('../views/CrudMainView.vue'),
      children: [
        {
          path: '',
          name: 'read',
          component: () => import('../views/CrudView.vue')
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('../views/CrudFormView.vue')
        },
        {
          path: ':id/edit',
          name: 'update',
          component: () => import('../views/CrudFormView.vue')
        }
      ]
    }
  ],
});

export default router;
