import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("@/views/Posts.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/Users.vue"),
  },
  {
    path: "/writepost",
    name: "WritePost",
    component: () => import("@/views/WritePost.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/updateprofile",
    name: "UpdateProfile",
    component: () => import("@/views/UpdateProfile.vue"),
  },
  {
    path: "/user/:id/posts",
    name: "UserPosts",
    component: () => import("@/views/UserPosts.vue"),
  },
  {
    path: "/user/:id/profile",
    name: "UserProfile",
    component: () => import("@/views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
