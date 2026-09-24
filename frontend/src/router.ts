import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/**
 * Every page is loaded lazily, so each view ends up in its own small file.
 * Add new pages here: the header navigation in `components/AppHeader.vue`
 * links to them by route name.
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/quote',
    name: 'quote',
    component: () => import('./views/QuoteView.vue'),
    meta: { title: 'Quote Assistant' },
  },
  {
    path: '/contract',
    name: 'contract',
    component: () => import('./views/ContractView.vue'),
    meta: { title: 'Contract / TOS Assistant' },
  },
  {
    path: '/script',
    name: 'script',
    component: () => import('./views/ScriptAnalyzerView.vue'),
    meta: { title: 'Script Analyzer' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./views/NotFoundView.vue'),
    meta: { title: 'Page not found' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Classic class added to the navigation link of the page you are on.
  linkActiveClass: 'bg-slate-800 text-white',
  // Always open a new page at the top.
  scrollBehavior: () => ({ top: 0 }),
})

const appName = 'CreatorFlow AI'

router.afterEach((to) => {
  const pageTitle = to.meta.title
  document.title = typeof pageTitle === 'string' ? `${pageTitle} | ${appName}` : appName
})

export default router
