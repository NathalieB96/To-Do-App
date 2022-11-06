
import { createRouter, createWebHistory} from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../pages/home.vue") },
        { path: "/register", component: () => import("../pages/register.vue") },
        { path: "/signin", component: () => import("../pages/signin.vue") },
        { path: "/todo", component: () => import("../pages/todo.vue") },
    ]
  })

  export default router;