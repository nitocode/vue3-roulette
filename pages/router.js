import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Docs from "./views/Docs.vue"

export const router = createRouter({
    history: createWebHistory("/vue3-roulette/"),
    routes: [
      { path: "/", component: Home },
      { path: "/docs", component: Docs },
    ],
  })
  