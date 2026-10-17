import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LinkTree from '@/views/LinkTree.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/linktree'
    },
    {
      path: '/linktree',
      name: 'linktree',
      component: LinkTree
    },
    {
      path: '/events/:eventId',
      name: 'events',
      component: () => import('../views/EventsView.vue'),
      props: true
    },
    {
      path: '/events',
      name: 'events-list',
      component: () => import('../views/EventsListView.vue')
    },
    {
      path: '/poetry',
      component: () => import('../components/PoemsList.vue')
    },
    {
      path: '/poetry/:poemTitle',
      name: 'poetry',
      component: () => import('../views/PoetryView.vue'),
      props: true
    },
    {
      path: '/anthology',
      name: 'anthology',
      component: () => import('../views/AnthologyView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/404View.vue')
    }
  ]
})

export default router
