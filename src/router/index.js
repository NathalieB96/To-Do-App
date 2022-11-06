
import { createRouter, createWebHistory} from "vue-router";
import { getAuth, onAuthStateChanged} from "firebase/auth"; 


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../pages/home.vue") },
        { path: "/register", component: () => import("../pages/register.vue") },
        { path: "/signin", component: () => import("../pages/signin.vue") },
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
            reject
        );
    });
  };

  router.beforeEach((to, from, next ) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (getAuth().currentUser) {
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