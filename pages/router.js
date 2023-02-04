import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Docs from "./views/Docs.vue"
import Examples from "./views/Examples.vue"

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/docs', component: Docs },
    { path: '/examples', component: Examples },
  ],
})
