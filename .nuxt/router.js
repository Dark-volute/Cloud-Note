import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _25f501c2 = () => interopDefault(import('../pages/book.vue' /* webpackChunkName: "pages/book" */))
const _750861ef = () => interopDefault(import('../pages/main.vue' /* webpackChunkName: "pages/main" */))
const _4d5d22de = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _f784411c = () => interopDefault(import('../pages/trash.vue' /* webpackChunkName: "pages/trash" */))
const _0d78b80c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _3364aeb4 = () => interopDefault(import('../pages/index/login.vue' /* webpackChunkName: "pages/index/login" */))
const _0059e5ca = () => interopDefault(import('../pages/index/retrievePassword.vue' /* webpackChunkName: "pages/index/retrievePassword" */))
const _cdcde3e0 = () => interopDefault(import('../pages/index/sign.vue' /* webpackChunkName: "pages/index/sign" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/book",
      component: _25f501c2,
      name: "book"
    }, {
      path: "/main",
      component: _750861ef,
      name: "main"
    }, {
      path: "/search",
      component: _4d5d22de,
      name: "search"
    }, {
      path: "/trash",
      component: _f784411c,
      name: "trash"
    }, {
      path: "/",
      component: _0d78b80c,
      name: "index",
      children: [{
        path: "login",
        component: _3364aeb4,
        name: "index-login"
      }, {
        path: "retrievePassword",
        component: _0059e5ca,
        name: "index-retrievePassword"
      }, {
        path: "sign",
        component: _cdcde3e0,
        name: "index-sign"
      }]
    }],

    fallback: false
  })
}
