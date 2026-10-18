import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import LinkTree from '@/views/LinkTree.vue'
import useFiretore from '@/stores/firestore.js'

function authGuard(to: RouteLocationNormalized) {
  const { isAdmin } = useFiretore()

  if (isAdmin.value === true) return true

  router.push({
    name: '404',
    params: { catchAll: to.fullPath.replace('/', '') },
    path: to.fullPath
  })
}

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
      props: true,
      beforeEnter: authGuard
    },
    {
      path: '/events',
      name: 'events-list',
      component: () => import('../views/EventsListView.vue'),
      beforeEnter: authGuard
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
