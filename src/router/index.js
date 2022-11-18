
import { createRouter, createWebHistory} from "vue-router";
import { getAuth, onAuthStateChanged} from "firebase/auth"; 
import { async } from "@firebase/util";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/register", component: () => import("../pages/register.vue") },
        { path: "/signin", component: () => import("../pages/signin.vue") },
        { path: "/", redirect: "/signin" },
        { 
            path: "/todo", 
            component: () => import("../pages/todo.vue"),
            meta: {
                requiresAuth: true
            }, 
        },
    ]
  })

  const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged (
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
  };

  router.beforeEach(async(to, from, next ) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("you don't have access!")
            next("/signin")
        }
    } else {
        next();
    }
  });

  export default router;