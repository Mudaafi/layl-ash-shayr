import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/sessions',
      name: 'sessions',
      component: () => import('../views/SessionView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('../views/OpenMicView.vue')
    },
    {
      path: '/about-us',
      name: 'people',
      component: () => import('../views/PeopleView.vue')
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
      // temporary, for demo
      path: '/landing',
      component: () => import('../views/LandingView.vue')
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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.name !== 'anthology' && !authStore.isAdmin) {
    next({ name: 'anthology' })
  } else next()
})

export default router
