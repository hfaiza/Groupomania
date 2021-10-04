import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Signup",
    component: () => import("@/views/Signup.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next({ name: "Posts" });
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next({ name: "Posts" });
      } else {
        next();
      }
    },
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("@/views/Posts.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next({ name: "Signup" });
      } else {
        next();
      }
    },
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next({ name: "Signup" });
      } else {
        next();
      }
    },
  },
  {
    path: "/writepost",
    name: "WritePost",
    component: () => import("@/views/WritePost.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next({ name: "Signup" });
      } else {
        next();
      }
    },
  },
  {
    path: "/updateprofile",
    name: "UpdateProfile",
    component: () => import("@/views/UpdateProfile.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next({ name: "Signup" });
      } else {
        next();
      }
    },
  },
  {
    path: "/user/:id/posts",
    name: "UserPosts",
    component: () => import("@/views/UserPosts.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next({ name: "Signup" });
      } else {
        next();
      }
    },
  },
  {
    path: "/user/:id/profile",
    name: "UserProfile",
    component: () => import("@/views/UserProfile.vue"),
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next({ name: "Signup" });
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
