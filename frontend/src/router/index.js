import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const redirect = (to, from, next, routeName, boolean) => {
  if (store.state.loggedIn === boolean) {
    next({ name: routeName })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Posts', true)
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Posts', true)
    }
  },
  {
    path: '/posts',
    name: 'Posts',
    component: () => import('@/views/Posts.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Signup', false)
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/Users.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Signup', false)
    }
  },
  {
    path: '/writepost',
    name: 'WritePost',
    component: () => import('@/views/WritePost.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Signup', false)
    }
  },
  {
    path: '/updateprofile',
    name: 'UpdateProfile',
    component: () => import('@/views/UpdateProfile.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Signup', false)
    }
  },
  {
    path: '/user/:id/posts',
    name: 'UserPosts',
    component: () => import('@/views/UserPosts.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Signup', false)
    }
  },
  {
    path: '/user/:id/profile',
    name: 'UserProfile',
    component: () => import('@/views/UserProfile.vue'),
    beforeEnter: (to, from, next) => {
      redirect(to, from, next, 'Signup', false)
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
